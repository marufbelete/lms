
require('dotenv').config()
const db_config = require('../src/config/config')
const config = {
development: {
  username: db_config.DB_USER,
  password: db_config.DB_PASSWORD,
  database: db_config.DB_NAME,
  host: db_config.DB_HOST,
  dialect: db_config.DB_DIALECT,
},
production: {
  username: db_config.DB_USER,
  password: db_config.DB_PASSWORD,
  database: db_config.DB_NAME,
  host: db_config.DB_HOST,
  dialect: db_config.DB_DIALECT,
}
};
module.exports = config;