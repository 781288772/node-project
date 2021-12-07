var express = require('express');
var router = express.Router();
// 连接数据库
const dbConfig = require('../utils/connect')
var sql = 'select * from user';
var sqlArr = [];

var callBack = (err,data)=>{
    if(err){
        console.log('数据库连接出错');
        return;
    }
    console.log("系统用户表数据:=====>",data);
    return data;

    
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  dbConfig.sqlConnect(sql,sqlArr,((err,data)=>{
    if(err){
      throw err;
      return;
    }
    res.send(data)

  }));


  
 
});

module.exports = router;
