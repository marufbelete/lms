const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Lesson_User = sequelize.define("lesson_user", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  is_started:{
    type: Sequelize.BOOLEAN,
    defaultValue:false
  }

});

module.exports = Lesson_User;
