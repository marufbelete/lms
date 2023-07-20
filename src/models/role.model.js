const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Role = sequelize.define("role", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
});

module.exports = Role;
