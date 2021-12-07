const { User } = require('../../model/user');
const JwtUtil = require('../../jwt')
const dbConfig = require('../../model/connect')
const addUser = async (req, res) => {
    let { username, password } = req.body;
    console.log('请求的参数=========>', req.body);
    // console.log(username);
    if(username==undefined || username==""){
        let obj = {
            code: 40004,
            message: '用户名不能为空',
        }
        res.send(obj)
        return
    }
    if( password==undefined||password==""){
        let obj = {
            code: 40004,
            message: '密码不能为空',
        }
        res.send(obj)
        return
    }
    var sql = `insert into sys_user(username,password) values('${username}','${password}')`; 
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错');
            return;
        }

        if (data.length == 0) {
            let obj = {
                code: 20001,
                message: '操作失败',
            }
            res.send(obj);
        } else {
            let obj = {
                code: 20000,
                message: '操作成功',
            }
            res.send(obj)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);

}


module.exports = addUser;