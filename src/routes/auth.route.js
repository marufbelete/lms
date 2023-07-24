const express=require('express')
const route=express.Router({ mergeParams: true })
const passport = require("passport");
const {registerUser,loginUser, confirmEmail}=require('../controllers/auth.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')
const bouncer = require("../helpers/bruteprotect");
const { issueGoogleToken } = require('../auth/google');

route.post('/signup',
    registerUser,
    errorHandler)
route.post('/login',
    bouncer.block,
    loginUser,
    errorHandler)
route.get("/google",
    passport.authenticate("google", {
        session: false,
        scope: ["email", "profile"],
    })
    );
    //issue token on success
route.use("/google/callback",
    passport.authenticate("google", {
        session: false
    }),
    issueGoogleToken,
    errorHandler
    );
route.get('/confirm',
    confirmEmail,
    errorHandler)
module.exports=route