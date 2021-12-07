const express = require('express');
const admin = express.Router();
admin.post('/login', require('./admin/login'))
admin.post('/addUser', require('./admin/addUser'))
admin.post('/deleteUser', require('./admin/deleteUser'))
admin.post('/queryUserList', require('./admin/queryUserList'))
admin.post('/register',require('./admin/register'))
module.exports = admin;