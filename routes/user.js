const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const UserModal = require("../modal/user.modal");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { email, password, name, gender, age, city, is_married } = req.body;

  try {
    const isReg = await UserModal.findOne({ email });
    if (isReg) {
      return res.status(400).json({ msg: "User already exist, please login" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const user = new UserModal({email, password:hash, name, gender, age, city, is_married });
        await user.save()
        return res.status(200).json({ msg: "Account is created" })
      }
    });
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong" })
  }
});

userRoute.post('/login',async(req,res)=>{
    const { email, password} = req.body
    try{
        const user = await UserModal.findOne({email})

        if(!user){
            return res.status(400).json({ msg: "User not found" })
        }

        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                return res.status(200).json({ msg: "Login Sucessfull",token:jwt.sign({id:user._id},"masai")  })
            }else{
                return res.status(200).json({ msg: "Login Failed"  })
            }
        })
        

    }catch(err){
        return res.status(400).json({ msg: "something went wrong" })
    }
})

module.exports = userRoute;
