const express=require('express')
const route=express.Router()
const role_route = require('./role.route');

const PATH={
    ROLE:'/role',
}

route.use(PATH.ROLE,role_route)

module.exports=route