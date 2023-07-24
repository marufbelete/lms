const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Step = sequelize.define("step", {
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
  content: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  
});

module.exports = Step;
