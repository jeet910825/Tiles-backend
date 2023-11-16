const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter the email id"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"]
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("User",userSchema)