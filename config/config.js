
require('dotenv').config()
const db_config = require('../src/config/config')
const config = {
  development: {
    url: db_config.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: db_config.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config;