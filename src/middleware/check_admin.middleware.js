const { ROLE } = require("../constant/role");
const { handleError } = require("../helpers/handleError");
const { getLoggedUser } = require("../helpers/user");

exports.authAdmin = async(req, res, next) => {
  try{
  const user= getLoggedUser(req)  
  const user_roles= await user.getRoles()
  const is_user_admin= user_roles?.find(role=>role.name===ROLE.ADMIN)
  if (is_user_admin) {
    next();
    return;
  }
  return handleError("no access",403);
  } catch (error) {
    next(error);
 }
};
