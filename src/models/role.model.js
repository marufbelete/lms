const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const { ROLE } = require("../constant/role");

const Role = sequelize.define("role", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.ENUM(ROLE.ADMIN,ROLE.LECTURE,ROLE.STUDENT),
    defaultValue: ROLE.STUDENT
  },
  
});

module.exports = Role;
