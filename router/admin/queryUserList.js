const dbConfig = require('../../model/connect')
const R = require('../../config/R')
const queryUserList = async (req, res) => {
    let { username,password,id } = req.body;
    console.log('请求的参数========>', req.body);
    // console.log(username);

    var sql = `select * from sys_user`;
    console.log("SQL:",sql);
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
                data:data
            }
            res.send(R.success(data))
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);

}


module.exports = queryUserList;