const Role = require("../models/role.model");

const insertRole=async(param)=>{
  const new_role = new Role(param)
  const  result= await new_role.save()
  return result;
}

const fetchRoles=async()=>{
  const result =  await Role.findAll()
  return result;
}

const fetchRole=async(filter)=>{
  const result =  await Role.findOne(filter)
  return result;
}

const editRole=async(param,filter)=>{
  const result =  await Role.update(param,filter)
  return result;
  }

const removeRole=async(filter)=>{
  const result =  await Role.destroy(filter)
  return result;
  }


module.exports={
insertRole,
fetchRoles,
fetchRole,
editRole,
removeRole
}