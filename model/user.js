const {strict} = require('assert');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})

const User = mongoose.model('User', userSchema);

async function addUser() {
    // const user = await User.create({
    //     username:'system',
    //     password:1
    // })
}

module.exports = {
    User
}