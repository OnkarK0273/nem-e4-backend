const mongoose = require('mongoose')

const userScema = mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String,
    age : Number,
    city : String,
    is_married : Boolean
})

const UserModal = mongoose.model('user',userScema)

module.exports = UserModal