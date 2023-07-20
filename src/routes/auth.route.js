const express=require('express')
const route=express.Router()
const {registerUser,loginUser}=require('../controllers/auth.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')
const bouncer = require("../helpers/bruteprotect");

route.post('/signup',registerUser,errorHandler)
route.post('/login',bouncer.block,loginUser,errorHandler)


module.exports=route