const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Lesson = sequelize.define("lesson", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Lesson;
