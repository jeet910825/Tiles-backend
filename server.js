require('dotenv').config()
const express = require("express");
const bodyparser = require("body-parser")
const cors = require("cors")
const connect = require("./config/dbConfig")
const cookieParser = require('cookie-parser')
const path = require('path')
const PORT = process.env.PORT || 3005
const app = express()

// middleware

app.use(express.static('public'))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())
app.use(cookieParser())



//db connection
connect()

app.use("/",require("./router/productRoute"))
app.use('/',require('./router/userRouter'))
app.get("/product/images/:imageid",(req,res)=>{
    res.sendFile(path.join(__dirname,'public/images/'+req.params.imageid))
})

app.listen(PORT,()=>{
    console.log("server is running")
})