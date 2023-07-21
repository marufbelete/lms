const express=require('express')
const route=express.Router()
const role_route = require('./role.route');
const auth_route = require('./auth.route');
const user_route = require('./user.route');

const PATH={
    AUTH:'/auth',
    ROLE:'/role',
    USER:'/user'
}

route.use(PATH.ROLE,role_route)
route.use(PATH.AUTH,auth_route)
route.use(PATH.USER,user_route)

module.exports=route