const mongoose = require('mongoose')

const postScema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number
    })

const PostModal = mongoose.model('post',postScema)

module.exports = PostModal