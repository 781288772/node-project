const { User } = require('../../model/user');
const JwtUtil = require('../../jwt')
const dbConfig = require('../../model/connect')
const deleteUser = async (req, res) => {
    let { id } = req.body;
    console.log('请求的参数========>', req.body);
    // console.log(username);
    if(id==undefined || id==""){
        let obj = {
            code: 20002,
            message: '用户id不能为空',
        }
        res.send(obj)
        return
    }

    var sql = `delete from sys_user where id=${id}`; 
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


module.exports = deleteUser;