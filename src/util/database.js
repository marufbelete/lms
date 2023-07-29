const {Sequelize}=require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

 
module.exports=sequelize;