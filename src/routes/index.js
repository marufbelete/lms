const express=require('express')
const route=express.Router()
const role_route = require('./role.route');
const auth_route = require('./auth.route');

const PATH={
    AUTH:'/auth',
    ROLE:'/role',
}

route.use(PATH.ROLE,role_route)
route.use(PATH.AUTH,auth_route)

module.exports=route