const express = require("express");
require('dotenv').config()
const cookieParser=require('cookie-parser')
const sequelize = require("./util/database");
const app = express();
const api_route = require('./routes/index');
const cors = require('cors');
const passport = require('passport');
// const responseTime=require('response-time');
const config = require("./config/config");
const Relation = require("./models/relation.model");
const { googlePassport } = require("./auth/google");

app.use(cors({
    origin: ['http://localhost:3000','https://sorobanlearn.com',
    'https://sorobanlearn-api-c47b0546b177.herokuapp.com'],
    credentials: true
}));
app.use(cookieParser())
app.options('*', cors())

//initialize passport
app.use(passport.initialize());
googlePassport(passport);
//log response time
// app.use(responseTime((req, res, time) => {
//   console.log(`${req.method} ${req.url} ${time}ms`);
// }))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public')); 
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

