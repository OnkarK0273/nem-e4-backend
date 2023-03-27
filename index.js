const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const authMiddle = require('./middlewers/auth.midd')

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users",userRoute)

app.use(authMiddle)
app.use("/posts",postRoute)

app.listen(4900,async()=>{
    try{
        await mongoose.connect('mongodb+srv://onkar:onkaratlas@cluster0.xxociih.mongodb.net/eval?retryWrites=true&w=majority')
        console.log('connected to db')

    }catch(err){
        console.log('not connected')
        console.log(err)
    }

    console.log('port 4900 is running')

})