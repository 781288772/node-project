const express = require('express');
const admin = express.Router();
admin.post('/login', require('./admin/login'))
admin.post('/addUser', require('./admin/addUser'))
admin.post('/deleteUser', require('./admin/deleteUser'))
admin.get('/queryUserList', require('./admin/queryUserList'))
admin.post('/register',require('./admin/register'))
admin.get('/getUserDetailById',require('./admin/queryUserDetail'))
module.exports = admin;