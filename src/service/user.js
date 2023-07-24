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

const fetchUser=async(filter)=>{
  const  result= await User.findOne(filter)
  return result;
}

const fetchUserById=async(user_id)=>{
  const  result= await User.findByPk(user_id)
  return result;
}




module.exports={
insertUser,
editUser,
fetchUser,
fetchUserById
}