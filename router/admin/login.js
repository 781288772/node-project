const { User } = require('../../model/user');
const JwtUtil = require('../../jwt')
const dbConfig = require('../../model/connect')
const R = require('../../config/R')
const login = async (req, res) => {
    let { username, password } = req.body;
    console.log('请求的参数：', req.body);
    var sql = "select * from sys_user where username='" + username + "' and password='" + password + "'";
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错');
            return;
        }

        if (data.length == 0) {
            let obj = {
                msg: '用户名或密码不正确',
            }
            res.send(R.fail(obj));
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
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
    // let user = await User.findOne({username: 'system'})
    // console.log(user._id);
    //  res.send(user)


    // if (password === user.password) {
    //     let _id = user._id.toString();
    //     let jwt = new JwtUtil(_id);
    //     let token = jwt.generateToken(_id);
    //     let obj = {
    //         code: 20000,
    //         message: '登录成功',
    //         token: token
    //     }
    //     res.send(obj)
    // }else{
    //     let obj = {
    //         code:20001,
    //         message:'密码不正确',
    //     }
    //     res.send(obj);
    // }

    // res.send(data)  
    // console.log(data[0].password);
    // if (password === data[0].password) {
    //     let _id = data[0].id.toString();
    //     let jwt = new JwtUtil(_id);
    //     let token = jwt.generateToken(_id);
    //     let obj = {
    //         code: 20000,
    //         message: '登录成功',
    //         token: token
    //     }
    //     res.send(obj)
    // } else {
    //     let obj = {
    //         code: 20001,
    //         message: '用户名或密码不正确',
    //     }
    //     res.send(obj);
    // }


}


module.exports = login