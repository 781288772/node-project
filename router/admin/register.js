
const { User } = require('../../model/user');
const dbConfig = require('../../model/connect')
const R = require('../../config/R')
var uuid = require('node-uuid');
// 生成uuid
let uid = uuid.v1();
uid = uid.replace(/-/g,"")
console.log(uid)
const register = async (req, res) => {
    let { username, password } = req.body;
    console.log('请求的参数=========>', req.body);

    // console.log(username);
    if(username==undefined || username==""){
        let obj = {
            code: 400,
            msg: '用户名不能为空',
        }
        res.send(R.bizFail(obj))
        return
    }
    if( password==undefined||password==""){
        let obj = {
            code: 400,
            msg: '密码不能为空',
        }
        res.send(R.bizFail(obj))
        return
    }

    var sql = `insert into sys_user(id,username,password) values('${uid}','${username}','${password}')`; 
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错');
            return;
        }

        if (data.length == 0) {
            res.send(R.fail());
        } else {
            res.send(R.success())
        }
    }

    dbConfig.sqlConnect(`select * from sys_user where username = '${username}'`, [], (err,data)=>{
        // 报错或者数据库已经有该用户名，停止执行
                if(err){
                    res.send(R.fail(err))
                    return;
                }
                if(data.length!=0){
                    let obj = {
                        code:500,
                        msg:'该账号已被注册！'
                    }
                   res.send(R.bizFail(obj))
                   return;
                  
                }else{
                    dbConfig.sqlConnect(sql, sqlArr, callBack);
                }          
    });
   
  
}


module.exports = register;