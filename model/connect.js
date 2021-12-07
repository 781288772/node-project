// const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
// mongoose.connect('mongodb://localhost/app', {useUnifiedTopology: true, useNewUrlParser: true})
//     .then(() => console.log('数据库连接成功'))
//     .catch(() => {
//         console.log('数据库连接失败')
//     })
const mysql = require('mysql');
module.exports = {
    // 数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'test'
    },
    // 连接数据库,使用mysql连接池连接方式
    // 连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(!err){
                console.log('数据库连接成功');
            }
            if(err){
                console.log('数据库连接失败');
                return;
            }
            // 事件驱动回调
            conn.query(sql,sqlArr,callBack);
            // 释放连接
            conn.release();
        })

    }


}