// 引入框架
const express = require('express');
// 创建网站服务器
const app = express();
const path = require('path');
const R = require('./config/R')
const user = require('./router/admin/user')
    user.login()
    user.userSubmit()

// 处理post请求参数
// 被弃用
// const bodyParser = require('body-parser');
// 连接数据库
const dbConfig = require('./model/connect')
var sql = 'select * from sys_user';
var sqlArr = [];
var callBack = (err,data)=>{
    if(err){
        console.log('数据库连接出错');
        return;
    }
    // R.success(data);
    // console.log("系统用户表数据:",data);
    
}
dbConfig.sqlConnect(sql,sqlArr,callBack);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// const Jwt = require('./jwt')
app.all('*', function (req, res, next) {
    // console.log(req.headers.origin)
    // console.log(req.environ)
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();
})
app.use('/static',express.static(path.join(__dirname,'public')));
app.use(require('./validToken'));
const login = require('./router/admin');
app.use('/admin', login);

app.listen(3000, () => {
    console.log('服务已启动,端口：3000');
});
