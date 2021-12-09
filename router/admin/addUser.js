
const dbConfig = require('../../model/connect')
const R = require('../../config/R')
const addUser = async (req, res) => {
    let { username, password } = req.body;
    console.log('请求的参数=========>', req.body);
    // console.log(username);
    if(username==undefined || username==""){
        res.send(R.bizFail({code:500,msg:'用户名不能为空'}))
        return
    }
    if( password==undefined||password==""){
        res.send(R.bizFail({code:500,msg:'密码不能为空'}))
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
            res.send(R.fail());
        } else {
            res.send(R.success());
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);

}
module.exports = addUser;