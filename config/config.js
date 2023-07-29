
require('dotenv').config()
const db_config = require('../src/config/config')
const config = {
development:db_config.DATABASE_URL,
production: db_config.DATABASE_URL 
};
module.exports = config;