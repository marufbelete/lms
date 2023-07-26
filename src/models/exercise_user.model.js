const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Exercise_User = sequelize.define("exrecise_user", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  is_completed:{
    type: Sequelize.BOOLEAN,
    defaultValue:false
  }
});

module.exports = Exercise_User;
