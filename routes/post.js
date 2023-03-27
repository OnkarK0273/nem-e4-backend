const express = require("express");
const jwt = require('jsonwebtoken');
const PostModal = require("../modal/post.modal");
const postRoute = express.Router()

postRoute.get('/',async(req,res)=>{
    const token = req.headers.token
    const decode = jwt.verify(token,"masai")
    
    try{
        const posts = await PostModal.find({userID:decode.id}).limit(3).skip()
        res.status(200).json({"posts":posts})
    }catch(err){
        res.status(400).json({ msg: "something went wrong" })
    }

})


postRoute.post("/add",async(req,res)=>{
    
    try{
        const posts = new PostModal(req.body)
        await posts.save()
        res.status(200).json({"msg":"post is added"})
    }catch(err){
        res.status(400).json({ msg: "something went wrong" })
    }

})


postRoute.patch(`/update/:_id`,async(req,res)=>{


    
    try{
        const posts = await PostModal.updateOne(req.params,{$set:req.body})

        res.status(200).json({"msg":"post updated sucessfully"})
    }catch(err){
        res.status(400).json({ msg: "something went wrong" })
    }

})

postRoute.delete(`/delete/:_id`,async(req,res)=>{


    
    try{
        const posts = await PostModal.deleteOne(req.params)

        res.status(200).json({"msg":"post deleted sucessfully"})
    }catch(err){
        res.status(400).json({ msg: "something went wrong" })
    }

})



module.exports = postRoute