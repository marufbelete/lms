const User = require("./user.model"); 
const Role = require("./role.model");

const Relation = () => {
   //role to user
   User.belongsToMany(Role, { through: 'User_Role' });
   Role.belongsToMany(User, { through: 'User_Role' });
  
 };
module.exports = Relation;
