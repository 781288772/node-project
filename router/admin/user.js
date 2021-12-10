// 注入JWT
const JwtUtil = require('../../jwt');
// 注入mysql实例
const dbConfig = require('../../model/connect');
// 注入返回对象
const R = require('../../config/R');
const res = require('express/lib/response');
var uuid = require('node-uuid');
// 生成uuid
let uid = uuid.v1();
uid = uid.replace(/-/g,"")
let sql = "";
let sqlArr = [];

/**
 * 登录
 * @param {请求参数} req 
 * @param {响应参数} res 
 */
const login = async function (req, res) {
    // 解构请求参数
    let {
        username,
        password
    } = req.body;
    // console.log('请求参数', req.body);
    sql = "select * from sys_user where username='" + username + "' and password='" + password + "'";
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
        if (err) throw err;
        if (data.length == 0) {
            let obj = {
                code: 400,
                msg: '用户名或密码不正确',
            }

            res.send(R.bizFail(obj))

        } else {
            let _id = data[0].id.toString();
            let jwt = new JwtUtil(_id);
            let token = jwt.generateToken(_id);
            // console.log(token);
            let takenData = {
                token
            }
            res.send(R.success(takenData))
        }
    });
}
/**
 * 用户注册
 * @param {*} req 
 * @param {*} res 
 */
const register = async function (req, res) {
    let {
        username,
        password,
        phone,
        email
    } = req.body;
    if (username == undefined || username == "") {
        let obj = {
            code: 400,
            msg: '用户名不能为空',
        }
        res.send(R.bizFail(obj))
        return
    }
    if (password == undefined || password == "") {
        let obj = {
            code: 400,
            msg: '密码不能为空',
        }
        res.send(R.bizFail(obj))
        return
    }
    // 注册之前先判断是否已存在
    sql = `insert into sys_user(id,username,password,phone,email) values('${uid}','${username}','${password}','${phone}','${email}')`
    dbConfig.sqlConnect(`select * from sys_user where username = '${username}'`, [], (err, data) => {
            if(err) throw err;
            if(data.length!=0){
                let obj = {
                    code:500,
                    msg:'该账号已被注册！'
                }
               res.send(R.bizFail(obj))
               return;
              
            }else{
                dbConfig.sqlConnect(sql, sqlArr, (err,data)=>{
                    if(err) throw err;
                    if (data.length == 0) {
                        res.send(R.fail());
                    } else {
                        res.send(R.success())
                    }
                });
              
            }    
                
    })


}
/**
 * 新增用户
 * @param {*} req 
 * @param {*} res 
 */
const addUser = (req,res)=>{

}
const updateUserInfo = (req,res)=>{
    let {id,username,phone,email} = req.body;
    sql = `update sys_user set username='${username}',phone='${phone}',email='${email}' where id='${id}'`;
    dbConfig.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err) throw err;
        res.send(R.success());
    })
}


module.exports = {
    login,
    register,
    addUser,
    updateUserInfo
}