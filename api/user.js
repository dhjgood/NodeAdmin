
/*
用户相关的路由
*/
const express =require('express');
const pool = require('../pool');
const moment  = require('moment')
var user = express.Router();
module.exports= user;

/*引入token的模块*/
const jwt=require("../config/jwt")

console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))

//登录
user.post('/login',(req,res)=>{
   var { user,upwd,tp}  = req.body
    if(tp==undefined) tp='M' ;
     if(!user){
        res.send({code:201,msg:"账号不能为空"});
        return;
     };
     if(!upwd){
         res.send({code:201,msg:"密码不能为空"});
         return;
     }
     var sql = "select user from ad_user where user=?";
     pool.query(sql,[user],(err,result)=>{
         if(err) throw err;
         if(result.length>0){
            var sql="select u_id,user,avatar from ad_user where user=? and upwd=? and tp=?"
            pool.query(sql,[user,upwd,tp],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    req.session.u_id = result[0].u_id;
                    res.send({
                        code:200,
                        msg:"登录成功",
                        token:jwt.generateToken(result[0]),
                        data:{
                            avatar:result[0].avatar,
                            user:result[0].user
                        },
                    });        
                }else{
                    res.send({code:201,msg:"账号或密码错误"});
                }
            })
         }else{
             res.send({code:201,msg:"账号不存在"});
         }
     });
   
})


//用户注册
// -- 后台管理者账号  tp = M  账号密码 
// -- 前台用户账号    tp = U  账号密码 其他暂定，，，

user.post('/reg',(req,res)=>{
    let { user,upwd,tp}  = req.body
     
    let {mali,create_time,avatar }  =  {mali:null,create_time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),avatar:`http://${req.headers.host}/img/avatar.jpg`}
    if(!user){
        res.send({code:201,msg:"账号不能为空"});
        return;
     };
     if(!upwd){
         res.send({code:201,msg:"密码不能为空"});
         return;
     }
    let sql = 'select user from ad_user where user=?'
    pool.query(sql,[user],(e,r)=>{
        if(e) throw e;
        if(r.length>0){
            res.send({msg:'账号已被注册'})
        }else{
            var sql = "insert into ad_user values(null,?,?,?,?,?,?)"
            pool.query(sql,[tp,user,upwd,mali,create_time,avatar],(e,r)=>{
                if(e) throw e;
                res.send({code:200,msg:"注册成功, 请登录"})
            })
        }
    })
})