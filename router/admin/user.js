// 注入JWT
const JwtUtil = require('../../jwt');
// 注入mysql实例
const dbConfig = require('../../model/connect');
// 注入返回对象
const R = require('../../config/R');
const res = require('express/lib/response');
let sql = "";
let sqlArr = [];
       /**
        * 登录
        * @param {请求参数} req 
        * @param {响应参数} res 
        */
        const login = async function (req, res) {
            // 解构请求参数
            let {
                username,
                password
            } = req.body;
            // console.log('请求参数', req.body);
            sql = "select * from sys_user where username='" + username + "' and password='" + password + "'";
            dbConfig.sqlConnect(sql, sqlArr, (err,data)=>{
                if (err) throw err;
                if (data.length == 0) {
                    let obj = {
                        code: 400,
                        msg: '用户名或密码不正确',
                    }
        
                    res.send(R.bizFail(obj))
                   
                }else{
                    let _id = data[0].id.toString();
                    let jwt = new JwtUtil(_id);
                    let token = jwt.generateToken(_id);
                    // console.log(token);
                    let takenData = {
                        token
                    }
                    res.send(R.success(takenData))
                }
            });
        }

        const userSubmit = async function (req, res) {
            console.log('submit')
        }


        module.exports = {
            login,
            userSubmit
        }