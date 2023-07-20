const express=require('express')
const route=express.Router()
const {addRole,getRoles,updateRole,getRoleById}=require('../controllers/role.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.post('/',addRole,errorHandler)
route.get('/',getRoles,errorHandler)
route.put('/:id',updateRole,errorHandler)
route.get('/:id',getRoleById,errorHandler)

module.exports=route