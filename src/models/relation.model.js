const User = require("./user.model"); 
const Role = require("./role.model");

const Relation = () => {
   //role to user
  Role.hasMany(User, {
    foreignKey: "role_id",
  });
  User.belongsTo(Role, {
    foreignKey: "role_id",
  });
  
 };
module.exports = Relation;
