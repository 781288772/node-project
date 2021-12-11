const express = require('express');
const user = require('../router/admin/user')
const admin = express.Router();
/**,
 * @swagger
 * /admin/login:
 *    post:
 *      tags:
 *      - 登录
 *      summary: 登录
 *      consumes:
 *      - application/json
 *      - application/xml
 *      produces:
 *      - application/json
 *      - application/xml
 *      parameters:
 *      - name: userInfo
 *        in: body
 *        description: 用户信息
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
/**,
 * @swagger
 * /admin/register:
 *    post:
 *      tags:
 *      - 注册
 *      summary: 注册
 *      produces:
 *      - application/json
 *      parameters:
 *      - username: username
 *        in: query
 *        description: 用户名
 *        required: true
 *        type: string
 *        maximum:
 *        minimum: 1
 *        format:
 *      - password: password
 *        in: query
 *        description: 密码
 *        required: true
 *        type: string
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
admin.post('/login',user.login)
admin.post('/addUser', require('./admin/addUser'))
admin.post('/deleteUser', require('./admin/deleteUser'))
admin.get('/queryUserList', require('./admin/queryUserList'))
admin.post('/register',user.register)
admin.get('/getUserDetailById',require('./admin/queryUserDetail'))
admin.post('/updateUserInfo',user.updateUserInfo)
module.exports = admin;

