const dbConfig = require('../../model/connect');
const R = require('../../config/R');
const updateUser = async (req, res) => {
    let { username,password,id,phone,email} = req.body;
    console.log('请求的参数========>', req.body);
    // console.log(username);
    if(id==undefined || id==""){
        let obj = {
            code: 400,
            message: '用户id不能为空',
        }
        res.send(R.bizFail(obj))
        return
    }
    var sql;
    // if(username=="" || username== undefined ){
    //     sql =  `update  sys_user set  password='${password}'  where id=${id}`;
    // }else if(password==""|| password==undefined){
    //     sql = `update  sys_user set username='${username}'  where id=${id}`;
    // }else{
    //     sql =  `update  sys_user set (username,password,phone,email) value('${username}','${password}','${phone}','${email}')  where id='${id}'`;
    // }
    sql =  `update  sys_user set username = '${username}',password = '${password}',phone = '${phone}',email = '${email}'  where id='${id}'`;

    
    console.log("SQL====>",sql);
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错');
            return;
        }

        if (data.length == 0) {
            let obj = {
                code: 400,
                message: '操作失败',
            }
            res.send(R.bizFail(obj));
        } else {
            res.send(R.success())
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);

}


module.exports = updateUser;