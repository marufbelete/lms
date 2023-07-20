
const { handleError } = require("../helpers/handleError");
const User = require("../models/user.model");

const insertUser=async(param)=>{
  const new_user = new User(param)
  const  result= await new_user.save()
  return result;
}
const editUser=async(param,filter)=>{
  const  result= await User.update(param,filter)
  return result;
}




module.exports={
insertUser,
editUser
}