const jwt = require("jsonwebtoken");
const util = require('util');
const { handleError } = require("../helpers/handleError");
const asyncVerify = util.promisify(jwt.verify);

const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      handleError("please login", 403);
    }
    const user = await asyncVerify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = user;
    next();
    return


  } catch (error) {
     next(error);
  }
};

module.exports = { authenticateJWT };
