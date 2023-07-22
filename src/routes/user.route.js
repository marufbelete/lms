const express=require('express')
const route=express.Router()
const {addRoleToUser,deleteRoleFromUser}=require('../controllers/user.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.put('/:id/role',addRoleToUser,errorHandler)
route.delete('/:id/role',deleteRoleFromUser,errorHandler)


module.exports=route