const Role = require("../models/role.model");
const { fetchUserByPk } = require("../service/user");

exports.addRoleToUser = async (req, res, next) => {
  try {
    const {role_id,user_id}= req.body
    const user=await fetchUserByPk(user_id)
    const existing_user_roles=await user.getRoles()
    console.log(existing_user_roles)
      if(existing_user_roles.find(e=>e.id===role_id))
     {
      return res.json({
      message:"This role already exist",
      success:true
      })
     }
     const role = await Role.findByPk(role_id);
     await user.addRole(role)
     return res.status(201).json({
       success:true,
       message:"role added successfully"
     })
    
  } catch (err) {
    next(err);
  }
};
exports.deleteRoleFromUser  = async (req, res, next) => {
  try {
    const {role_id,user_id}= req.body
    const user=await fetchUserByPk(user_id)
    const existing_user_roles=await user.getRoles()
      if(existing_user_roles.find(e=>e.id===role_id))
     {
      const role = await Role.findByPk(role_id);
      await user.removeRole(role)
      return res.status(201).json({
        success:true,
        message:"role removed successfully"
      })
     }
     return res.json({
      message:"This role not exist for this user",
      success:true
    })
  } catch (err) {
    next(err);
  }
};









