const {Sequelize}=require('sequelize');
const config = require('../config/config');;
console.log(config.ACCESS_TOKEN_SECRET)
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD, 
{ 
  host: config.DB_HOST,
  dialect: config.DB_DIALECT
});
 
module.exports=sequelize;