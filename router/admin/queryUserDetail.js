const dbConfig  = require('../../model/connect');
const R = require('../../config/R')

const queryUserDetail = async(req,res)=>{
    // 获取get请求参数
    let {id}  = req.query;
    // console.log(req.query)
    
    // let sql = `select * from sys_user where id = ${id}`
    let sql = `select id,username,phone,email from sys_user  where id = ${id}`
    let sqlArr = [];
    let callBack = (err, data) => {
        // console.log(res)
        if (err) {
            console.log(err)
            return;
        }
        console.log(data)
        if (data.length == 0) {
            res.send(R.bizFail({code:500,msg:'异常'}));
        } else {
            res.send(R.success(data[0]));
        }
    }
    
    dbConfig.sqlConnect(sql,sqlArr,callBack)

}

module.exports = queryUserDetail;