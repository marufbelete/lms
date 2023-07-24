const express=require('express')
const route=express.Router({ mergeParams: true })
const {addRole,getRoles,updateRole,
getRole, deleteRole}=require('../controllers/role.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.post('/',addRole,errorHandler)
route.get('/',getRoles,errorHandler)
route.put('/:id',updateRole,errorHandler)
route.get('/:id',getRole,errorHandler)
route.delete('/:id',deleteRole,errorHandler)

module.exports=route