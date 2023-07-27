const {Sequelize}=require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD, 
{ 
  host: config.DB_HOST,
  dialect: config.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }
});
 
module.exports=sequelize;