const asyncHandler = require('express-async-handler')
const User = require("../model/userModel")
const bcrypt = require('bcrypt')
const sendToken = require('../utils/jwttoken')

const createUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({email,password:hashedPassword})
    res.status(200).json({message:"user created sucessfully"})
})

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(401).json({sucess:false,message:"please enter the credential"})
    }
    const user = await User.findOne({email}).exec()
    if(!user){
        return res.status(404).json({sucess:false,message:"invalid user"})
    }
    
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
        return res.status(401).json({sucess:false,message:"invalid credential"})
    }
    sendToken(user,res)
})

const logout = asyncHandler(async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({sucess:true,message:"logout"})
})

module.exports = {createUser,login,logout}