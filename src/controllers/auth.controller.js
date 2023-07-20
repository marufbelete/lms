const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bouncer = require("../helpers/bruteprotect");
const { signupUserSchema, 
loginUserSchema } = require("../validation/user.validation");
const { handleError } = require("../helpers/handleError");
const { accountConfirmationEmail } = require("../constant/email");
const { issueToken, isEmailExist, 
hashPassword, isEmailVerified, isPasswordCorrect } = require("../helpers/user");
const util = require('util');
const config = require("../config/config");
const Role = require("../models/role.model");
const { editUser, insertUser } = require("../service/user");
const asyncVerify = util.promisify(jwt.verify);

exports.registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password,role_id} = req.body;
    const {error}=signupUserSchema.validate({ first_name, last_name, email, username, password})
      if(error){
          handleError(error.message,403)
        }
    // const token = jwt.sign({ email: email }, config.ACCESS_TOKEN_SECRET);
    // const mailOptions=accountConfirmationEmail(email,token)
    // await sendEmail(mailOptions);
    if (await isEmailExist(email)) {
      if (await isEmailVerified(email)) {
        handleError("User already exists with this email", 400);
      }
      else {
        const hashedPassword = await hashPassword(password);
        const filter = { where: { email: email } }
        const param={
          first_name,
          last_name,
          username,
          password: hashedPassword,
        }
        await editUser(param,filter)
        // await sendEmail(mailOptions);
        return res.json({ success: true });
      }
    }
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)
    const user = await insertUser({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
    });  
    console.log('reah')
    const role = await Role.findByPk(role_id);
    await user.addRole(role);
    // await sendEmail(mailOptions);
    return res.status(201).json({ success: true });
  }
  catch (err) {
    next(err);
  }
};


// Login a user
exports.loginUser = async (req, res, next) => {
  try {
    const param=req.body
    const {error}=loginUserSchema.validate(param)
      if(error){
          handleError(error.message,403)
        }
    const { email, password} = req.body;
    const user = await isEmailExist(email);
    if (user) {
      // if (!user.isEmailConfirmed) {
      //   const token = jwt.sign({ email: user.email }, 
      //   config.ACCESS_TOKEN_SECRET);
      //   const mailOptions=accountConfirmationEmail(email,token)
      //   // await sendEmail(mailOptions);
      //   handleError(
      //     "It seems like you haven't verified your email yet. Please check your email for the confirmation link.",
      //     400
      //   );
      // }
      if (await isPasswordCorrect(password, user.password)) {
          const access_token = param?.rememberme
          ? await issueToken(
            user.id,
            email,
            config.ACCESS_TOKEN_SECRET,
            config.LONG_ACCESS_TOKEN_EXPIRY
          )
          : await issueToken(
             user.id, 
             email,
             config.ACCESS_TOKEN_SECRET,
             config.ACCESS_TOKEN_EXPIRES);

        const info = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
        bouncer.reset(req);
        res.cookie('access_token',
          access_token, {
          path: "/",
          httpOnly:true,
          secure: true,
        })
      
        return res
          .status(200)
          .json({ auth: true, info});
      }
      handleError("Username or Password Incorrect", 400);
    }
    handleError("Username or Password Incorrect", 400);
  } 
  catch (err) {
    next(err);
  }
};















