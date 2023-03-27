const jwt = require('jsonwebtoken')

const authMiddle = (req,res,next)=>{
    const token = req.headers.token
    if(token){
        const decode = jwt.verify(token,"masai")

        if(decode){
            req.body.userID = decode.id
            next()
        }
    }else{
        return res.status(400).json({ msg: "please login first" })
    }
}


module.exports = authMiddle