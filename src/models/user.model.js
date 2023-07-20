const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  subscribed_to_newsletter: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  avatar: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  password: {
    type: Sequelize.STRING,
  }
});

module.exports = User;
