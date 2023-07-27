const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Course_User = sequelize.define("course_user", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

});

module.exports = Course_User;
