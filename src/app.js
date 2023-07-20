const express = require("express");
require('dotenv').config()

const sequelize = require("./util/database");
const app = express();
const api_route = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const responseTime=require('response-time');
const config = require("./config/config");
const Relation = require("./models/relation.model");

app.use(cors({
    origin: ['https://localhost:3000'],
    credentials: true
}));

//log response time
app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} ${time}ms`);
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public')); 
app.use(cookieParser())
Relation()
app.use('/api',api_route)

sequelize.sync().then(async(result)=>{
  app.listen(config.PORT || 7000,() => {
    console.log(`Server is running on port ${config.PORT}.`);
  })
}).catch(error=>{
  console.log(error)
})

module.exports = app;

