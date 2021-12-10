const express = require('express');
const user = require('../router/admin/user')
const admin = express.Router();
admin.post('/login',user.login)
admin.post('/addUser', require('./admin/addUser'))
admin.post('/deleteUser', require('./admin/deleteUser'))
admin.get('/queryUserList', require('./admin/queryUserList'))
admin.post('/register',require('./admin/register'))
admin.get('/getUserDetailById',require('./admin/queryUserDetail'))
admin.post('/updateUserInfo',require('./admin/updateUser'))
module.exports = admin;