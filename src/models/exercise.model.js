const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Exercise = sequelize.define("exercise", {
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

module.exports = Exercise;
