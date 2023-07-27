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
    unique: true,
  },
  subscribed_to_newsletter: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  is_email_confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  google_id: {
    type: Sequelize.STRING,
  },
  is_local_auth: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
