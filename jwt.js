const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// 创建token类
class Jwt {
    constructor(data) {
        this.data = data;
    }


// 生成token
    generateToken() {
        let data = this.data;
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, './key.pem'));//私钥 可以自己生成
        // let cert = 'mmjjww';
        let token = jwt.sign({
            data, // 自定义字段
            exp: created + 60 * 60, // 过期时间 60 分钟
            iat: created, // 创建时间
        }, cert, {algorithm: 'RS256'});
        return token;
    }
    // 校验token
    verifyToken() {
        let token = this.data
        // console.log(token);
        let cert = fs.readFileSync(path.join(__dirname, './key.pem')) // 公钥
        let res
        try {
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {}
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000)
            if (current <= exp) {
                res = result.data || {}
            }
        } catch (e) {
            res = 'err'
        }
        return res
    }

}

module.exports = Jwt;