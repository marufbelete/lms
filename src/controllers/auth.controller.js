const jwt = require("jsonwebtoken");
const bouncer = require("../helpers/bruteprotect");
const { signupUserSchema, 
loginUserSchema } = require("../validation/user.validation");
const { handleError } = require("../helpers/handleError");
const { accountConfirmationEmail } = require("../constant/email");
const { issueToken, isEmailExist, 
hashPassword, isEmailVerified, isPasswordCorrect, isTokenValid } = require("../helpers/user");
const config = require("../config/config");
const { editUser, insertUser, fetchUser } = require("../service/user");
const { sendEmail } = require("../helpers/mail");
const { fetchRole } = require("../service/role");
const { ROLE } = require("../constant/role");

exports.registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password,role_id} = req.body;
    const {error}=signupUserSchema.validate({ first_name, last_name, email,
       username, password,role_id})
      if(error){
          handleError(error.message,403)
        }
    const token = await issueToken({ email: email }, config.ACCESS_TOKEN_SECRET);
    const mailOptions=accountConfirmationEmail(email,token)
    if (await isEmailExist(email)) {
      if (await isEmailVerified({email})) {
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
        sendEmail(mailOptions);
        return res.json({ success: true });
      }
    }
    const hashedPassword = await hashPassword(password);
    const user = await insertUser({
      first_name,
      last_name,
      email,
      username,
      isLocalAuth:true,
      password: hashedPassword,
    });  
    const role = role_id?await fetchRole({where:{id:role_id}}):
    await fetchRole({
      where:{
        name:ROLE.STUDENT
      }});
    await user.addRole(role);
    sendEmail(mailOptions);
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
      if (!user.isEmailConfirmed) {
        const token = jwt.sign({ email: user.email }, 
        config.ACCESS_TOKEN_SECRET);
        const mailOptions=accountConfirmationEmail(email,token)
        sendEmail(mailOptions);
        handleError(
          "It seems like you haven't verified your email yet. Please check your email for the confirmation link.",
          403
        );
      }
      if (await isPasswordCorrect(password, user.password)) {
        const access_token = param?.rememberme
          ? await issueToken(
            { sub: user?.id, email:email},
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: config.LONG_ACCESS_TOKEN_EXPIRY})
          : await issueToken(
            { sub: user?.id, email:email},
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: config.ACCESS_TOKEN_EXPIRES})
                   
        const role_info=await user.getRoles({
            joinTableAttributes:['isActive']
        })
        const structured_role_info = role_info.map(role => {
          return {
            id: role.id,
            name: role.name,
            isActive: role.user_role.isActive
          };
        });
        const info = {
          id:user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role_info:structured_role_info,
          access_token,
          
        };
        bouncer.reset(req);
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

//confirm email
exports.confirmEmail = async (req, res, next) => {
  try {
    const { verifyToken } = req.query;
    const user = await isTokenValid(verifyToken,config.ACCESS_TOKEN_SECRET);
    if (user) {
      const filter={ where: { email: user.email } }
      const userInfo = await fetchUser(filter);
      userInfo.isEmailConfirmed = true;
      await userInfo.save();
      return res.json({
        confirmed:true
      });
    }
    handleError('erro user not exist',403)
  } catch (err) {
    next(err);
  }
};












