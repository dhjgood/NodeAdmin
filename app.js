// 引入模块
const  express = require('express')
const  cors    = require('cors')
const session  = require('express-session')
const path     = require('path')

/*引入token的模块*/
const jwt=require("./config/jwt")

// 实例化对象
const app =  express()

// 端口监听
const port  = process.env.PORT || 5050 ;
const host  = process.env.host || '192.168.101.147'
app.listen(port,()=>{
    console.log(`
    Serve is running~
    network:http://${host}:${port}`)
})

//设置跨域
app.use(cors({
  origin:"*",
  credentials:true
}))

//托管静态资源到public目录下
app.use(express.static(path.join(__dirname, './public')))
// 中间件 post
app.use(express.urlencoded({extended:false}));

// 验证token
app.use((req, res, next)=>{ 
    if (req.url != '/user' && (req.url.startsWith("/RO") )) {
      let token = req.headers.token;
      let result = jwt.verifyToken(token);
      // 如果考验通过就next，否则就返回登陆信息不正确
      if(result===undefined){
        res.send({status:403, msg:"未提供证书"})
      }else if (result.name == 'TokenExpiredError') {
        res.send({status: 403, msg: '登录超时，请重新登录'});
      } else if (result.name=="JsonWebTokenError"){
        res.send({status: 403, msg: '证书出错'})
      } else{
        req.user=result;
        next();
      }
    } else {
      next();
    }
  });




//添加 session
app.use(session({
    secret:"128位字符串",
    resave:true,
    saveUninitialized:true
}));

const user  = require('./api/user')
const file  = require('./api/file')
// 引入路由模块

// 挂载路由
app.use('/user',user)
app.use('/file',file)
