const JwtUtil = require('./jwt');
const R = require('./config/R')
const colors = require('colors-console');
module.exports = (req, res, next) => {
    console.log(colors('yellow','url------->'),req.url)
    if (req.url != '/admin/login' && req.url != '/admin/register') {
        console.log( req.headers);
        let token = req.headers.authorization;
        // let token = req.body.token; 
        //  console.log(token);
         if(token==""||token==undefined){
            res.send({code: 20003, message: '请登录后尝试'});
            return;
         }
        //  let vtoken = token.slice(7);
        let vtoken = token;
        //  console.log(vtoken);
        let jwt = new JwtUtil(vtoken);
        let result = jwt.verifyToken();
        // 通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            // console.log(result);
            res.send(R.bizFail({code: 401, msg: '登录已过期,请重新登录'}));
            
            // res.render('login.html');
        } else {
            // res.send({status: 20000, msg: '操作成功'});
            console.log("===========token可用================");
             next();
            
        }
    } else {
        next();
    }
}