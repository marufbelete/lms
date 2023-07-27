const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User_Role = sequelize.define("user_role", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue:true
  },
  
});

module.exports = User_Role;
