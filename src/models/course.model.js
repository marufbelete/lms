const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Course = sequelize.define("course", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
 
  
});

module.exports = Course;
