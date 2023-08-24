const jwt = require("jsonwebtoken");
const bouncer = require("../helpers/bruteprotect");
const { signupUserSchema,
  loginUserSchema,
  changePasswordSchema } = require("../validation/user.validation");
const { handleError } = require("../helpers/handleError");
const { accountConfirmationEmail } = require("../constant/email");
const { issueToken, isEmailExist,
  hashPassword, isEmailVerified, isPasswordCorrect, isTokenValid, getLoggedUser } = require("../helpers/user");
const config = require("../config/config");
const { editUser, insertUser, fetchUser } = require("../service/user");
const { sendEmail } = require("../helpers/mail");
const { fetchRole } = require("../service/role");
const { ROLE } = require("../constant/role");
const { getAuthInfo } = require("../helpers/common");
const sequelize = require('../util/database');


exports.registerUser = async (req, res, next) => {
  try {
    return await sequelize.transaction(async (t) => {
      const { first_name, last_name, email, username, password, role_id } = req.body;
      const { error } = signupUserSchema.validate({
        first_name, last_name, email,
        username, password, role_id
      })
      if (error) {
        handleError(error.message, 403)
      }
      const token = await issueToken({ email: email }, config.ACCESS_TOKEN_SECRET);
      const mailOptions = accountConfirmationEmail(email, first_name, token)
      if (await isEmailExist(email)) {
        if (await isEmailVerified({ email })) {
          handleError("User already exists with this email", 400);
        }
        else {
          const hashedPassword = await hashPassword(password);
          const filter = { where: { email: email }, returning: true }
          const param = {
            first_name,
            last_name,
            username,
            password: hashedPassword,
          }
          const [, [edited_user]] = await editUser(param, filter)
          sendEmail(mailOptions);
          //temp
          const role = await edited_user.getRoles()
          const access_token = await issueToken(
            { sub: edited_user?.id, email: edited_user.email },
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: config.ACCESS_TOKEN_EXPIRES })
          const info = getAuthInfo(edited_user, role, access_token)
          return res.json({ success: true, info });
        }
      }
      const hashedPassword = await hashPassword(password);
      const user = await insertUser({
        first_name, last_name,
        email, username,
        is_local_auth: true,
        password: hashedPassword,
      }, { transaction: t });
      let role = null
      if (role_id) {
        role = await fetchRole({ where: { id: role_id } })
      }
      if (!role) {
        role = await fetchRole({
          where: {
            name: ROLE.STUDENT
          }
        });
      }
      await user.addRole(role, { transaction: t });
      sendEmail(mailOptions);
      //temp
      const access_token = await issueToken(
        { sub: user?.id, email: user.email },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: config.ACCESS_TOKEN_EXPIRES })
      const user_roles = await user.getRoles({ transaction: t });
      const info = getAuthInfo(user, user_roles, access_token)
      return res.status(201).json({ success: true, info });
    });
  }
  catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const param = req.body
    const { error } = loginUserSchema.validate(param)
    if (error) {
      handleError(error.message, 403)
    }
    const { email, password } = req.body;
    const user = await isEmailExist(email);
    if (user) {
      // if (!user.is_email_confirmed) {
      //   const token = jwt.sign({ email: user.email }, 
      //   config.ACCESS_TOKEN_SECRET);
      //   const mailOptions=accountConfirmationEmail(email,user.first_name,token)
      //   sendEmail(mailOptions);
      //   handleError(
      //     "It seems like you haven't verified your email yet. Please check your email for the confirmation link.",
      //     403
      //   );
      // }
      if (await isPasswordCorrect(password, user.password)) {
        const access_token = param?.rememberme
          ? await issueToken(
            { sub: user?.id, email: user.email },
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: config.LONG_ACCESS_TOKEN_EXPIRY })
          : await issueToken(
            { sub: user?.id, email: user.email },
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: config.ACCESS_TOKEN_EXPIRES })

        const role_info = await user.getRoles({
          joinTableAttributes: ['is_active']
        })
        const info = getAuthInfo(user, role_info, access_token)
        bouncer.reset(req);
        return res.status(200).cookie("access_token", access_token, {
          sameSite: 'none',
          path: '/',
          secure: true,
          httpOnly: true
        }).json({ success: true, auth: true, info })
      }
      handleError("Username or Password Incorrect", 400);
    }
    handleError("Username or Password Incorrect", 400);
  }
  catch (err) {
    next(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    return res.status(200).clearCookie('access_token').json({
      success: true
    })
  } catch (err) {
    next(err);
  }
};

exports.confirmEmail = async (req, res, next) => {
  try {
    const { verifyToken } = req.query;
    const user = await isTokenValid(verifyToken, config.ACCESS_TOKEN_SECRET);
    if (user) {
      const filter = { where: { email: user.email } }
      const userInfo = await fetchUser(filter);
      userInfo.is_email_confirmed = true;
      const access_token = await issueToken(
        { sub: userInfo?.id, email: userInfo.email },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: config.ACCESS_TOKEN_EXPIRES })

      const role_info = await userInfo.getRoles({
        joinTableAttributes: ['is_active']
      })
      const info = getAuthInfo(userInfo, role_info, access_token)
      await userInfo.save();
      return res.status(200).cookie("access_token", access_token, {
        sameSite: 'none',
        path: '/',
        secure: true,
        httpOnly: true
      }).json({ success: true, auth: true, info })
    }

    handleError('erro user not exist', 403)
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const param = req.body
    const { error } = changePasswordSchema.validate(param)
    if (error) {
      handleError(error.message, 403)
    }
    const user = await getLoggedUser(req)
    if (!user) {
      handleError("please login!", 403)
    }
    if (!user.is_local_auth) {
      handleError("This account uses google authentication.", 403);
    }
    const { old_password, new_password } = req.body;
    if (await isPasswordCorrect(old_password, user.password)) {
      const hashedPassword = await hashPassword(new_password);
      await editUser(
        { password: hashedPassword },
        { where: { id: id } }
      );
      bouncer.reset(req);
      return res.json({
        message: "password successfully changed",
        success: true,
      });
    }
    handleError("old password not correct", 403);
  } catch (err) {
    next(err);
  }
};










