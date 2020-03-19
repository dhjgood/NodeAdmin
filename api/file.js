// 上传文件

const express = require('express')
const p = require('../pool')
const multer = require('multer')
const fs = require("fs");
const path = require("path");
var file = express.Router();
module.exports=  file;


let DateName =  `${ new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`  // 今天的日期    

let type  =multer({
    //设置文件存储路径
   dest: `./public/img/${DateName}`   //upload文件如果不存在则会自己创建一个。
  }).single('file')

file.post('/img',type,(req,res,next)=>{
    // req.file.length === 0 ||
        if (req.file==undefined) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
              res.json({
            code: "201",
            msg: "上传失败" 
          });
         
        } else {
         
           let file = req.file;
           let fileInfo = {};
           let nams = file.originalname.split('.')[1]
           fs.renameSync(`./public/img/${DateName}/` + file.filename, `./public/img/${DateName}/` + `${file.filename}.${nams}`);//这里修改文件名字，比较随意。
           // 获取文件信息
           fileInfo.mimetype = file.mimetype;
           fileInfo.originalname = file.originalname;
           fileInfo.size = file.size;
           fileInfo.path = file.path;
           // 设置响应类型及编码
           res.set({
             'content-type': 'application/json; charset=utf-8'
          });
         
          res.json({
            code: "200",
            msg: "上传成功",
            data:{
                src:`${req.headers.host}/img/${DateName}/${file.filename}.${nams}`
            }
          });
        }
})


