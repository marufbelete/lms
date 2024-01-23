import bouncer from "../helpers/bruteprotect";
import {
  signupUserSchema,
  loginUserSchema,
  changePasswordSchema,
} from "../validation/user.validation";
import { handleError } from "../helpers/handleError";
import { accountConfirmationEmail } from "../constant/email";
import {
  issueToken,
  hashPassword,
  isPasswordCorrect,
  isTokenValid,
  getLoggedUser,
  isEmailExist,
  mapUserRole,
} from "../helpers/user";
import config from "../config/config";
import { UserService, RoleService } from "../service/index.service";
import { sendEmail } from "../helpers/mail";
import { ROLE } from "../constant/role";
import sequelize from "../models";
import { Request, Response, NextFunction } from "express";
import {
  ILogin,
  IResponse,
  PersonCreationAttributes,
  UserResponse,
} from "../types";
import { Role } from "../models/role.model";
import { getImage, saveImage } from "../helpers/file";
import axios from "axios";
import { IncludeOptions } from "sequelize";

export default {
  registerUser: async (
    req: Request<{}, {}, PersonCreationAttributes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { email, password, role_id, username } = req.body;
        const { error } = signupUserSchema.validate({
          ...req.body,
        });
        if (error) {
          handleError(error.message, 400);
        }

        const token = issueToken({ email: email! }, config.ACCESS_TOKEN_SECRET);
        const mailOptions = accountConfirmationEmail(email!, username!, token);
        // if (await isEmailExist(email)) {
        //   if (await isEmailVerified({where:{ email }})) {
        //     handleError("User already exists with this email", 400);
        //   }
        //   else {
        //     const hashedPassword = await hashPassword(password);
        //     const filter = { where: { email: email }, returning: true };
        //     const param = {
        //       password: hashedPassword,
        //     };
        //     const [, [edited_user]] = await editUser(param, filter);
        //     await sendEmail(mailOptions);
        //     const role = await edited_user.getRoles();
        //     const access_token = issueToken(
        //       { sub: edited_user?.id, email: edited_user.email },
        //       config.ACCESS_TOKEN_SECRET,
        //       { expiresIn: config.ACCESS_TOKEN_EXPIRES }
        //     );
        //     const info = getAuthInfo(edited_user, role, access_token);
        //     return res.json({ success: true, info });
        //   }
        // }
        const hashedPassword = await hashPassword(password!);
        const user_to_add = {
          ...req.body,
          is_local_auth: true,
          password: hashedPassword,
        };
        let profile_url;
        if (req.file) {
          const key = await saveImage(req.file, config.AWS_PROFILE_FOLDER);
          profile_url = await getImage(key);
          user_to_add.avatar = key;
        }

        const user = await UserService.insertUser(user_to_add, {
          transaction: t,
        });
        const role_filter:IncludeOptions = role_id ? { where:{ id: role_id }} : { where:{ name: ROLE.STUDENT }};
        const role = await RoleService.fetchRole(role_filter);
        if(!role){
          return handleError("role not found",404)
        }
        await user.$add("role", role, { transaction: t });

        await sendEmail(mailOptions);
        const access_token = issueToken(
          { sub: user.id, email: user.email! },
          config.ACCESS_TOKEN_SECRET,
          { expiresIn: config.ACCESS_TOKEN_EXPIRES }
        );
        // const user_roles = await user.$get('roles',{transaction: t });
        // console.log(user_roles)
        // console.log(user_roles[0].user_role)
        //it only understand the instance role and gives
        //users as array but it will only have one user
        // b/c he instance role is from a given user
        // console.log(await user_roles[0].$get('users'),{transaction: t });
        // console.log(user_roles[0].user_roles);
        // console.log(user_roles[0].user_role);

        await user.reload({
          include: [
            {
              model: Role,
              through: { attributes: ["is_active"] },
            },
          ],
          transaction: t,
        });
        return res
          .status(201)
          .cookie("access_token", access_token, {
            sameSite: "none",
            path: "/",
            secure: true,
            httpOnly: true,
          })
          .json(mapUserRole(user,profile_url));
      });
    } catch (err) {
      next(err);
    }
  },

  loginUser: async (
    req: Request<{}, {}, ILogin>,
    // <IResponse<UserResponse>>
    res: Response,
    next: NextFunction
  ) => {
    try {
      const param = req.body;
      const { error } = loginUserSchema.validate(param);
      if (error) {
        handleError(error.message, 400);
      }
      const { email, password } = param;
      const user = await isEmailExist(email!);

      if (user) {
        if (await isPasswordCorrect(password!, user.password!)) {
          const access_token = param.remember_me
            ? issueToken(
                { sub: user.id, email: user.email! },
                config.ACCESS_TOKEN_SECRET,
                { expiresIn: config.LONG_ACCESS_TOKEN_EXPIRY }
              )
            : issueToken(
                { sub: user.id, email: user.email! },
                config.ACCESS_TOKEN_SECRET,
                { expiresIn: config.ACCESS_TOKEN_EXPIRES }
              );
          let profile_url
          if(user.avatar)profile_url= await getImage(user.avatar)
          bouncer.reset(req);
          return res
            .status(200)
            .cookie("access_token", access_token, {
              sameSite: "none",
              path: "/",
              secure: true,
              httpOnly: true,
            })
            .json(mapUserRole(user,profile_url));
        }
        handleError("Username or Password Incorrect", 401);
      }
      handleError("Username or Password Incorrect", 401);
    } catch (err) {
      next(err);
    }
  },

  forumLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email } = req.body;
      const forumApiUrl = `https://forum.sorobanlearn.com/register/setauthtoken/?type=json&apikey=${config.FORUM_API_KEY}&user=${username}&email=${email}`;
      const response = await axios.get(forumApiUrl, {
        headers: {
          "Content-Type": "application/json",
          // Other headers like authorization if required
        },
      });
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  },

  logoutUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res
        .status(200)
        .clearCookie("access_token", {
          sameSite: "none",
          path: "/",
          secure: true,
          httpOnly: true,
        })
        .json({
          success: true,
        });
    } catch (err) {
      next(err);
    }
  },

  confirmEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { verifyToken } = req.query as { verifyToken: string };
      const user = await isTokenValid(verifyToken, config.ACCESS_TOKEN_SECRET);
      if (user) {
        const filter:IncludeOptions = { where: { id: user?.sub } };
        const userInfo = await UserService.fetchUser(filter, {
          scope: "user_role_state",
        });
        if(!userInfo){
          return handleError("user not found",404)
        }
        userInfo.is_email_confirmed = true;

        const access_token = issueToken(
          { sub: userInfo?.id, email: userInfo.email! },
          config.ACCESS_TOKEN_SECRET,
          { expiresIn: config.ACCESS_TOKEN_EXPIRES }
        );

        await userInfo.save();
        return res
          .status(200)
          .cookie("access_token", access_token, {
            sameSite: "none",
            path: "/",
            secure: true,
            httpOnly: true,
          })
          .json({ success: true, auth: true, user: userInfo });
      }

      handleError("erro user not exist", 403);
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const param = req.body as { old_password: string; new_password: string };
      const { error } = changePasswordSchema.validate(param);
      if (error) {
        handleError(error.message, 403);
      }
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("please login!", 403);
      }
      if (user?.is_local_auth) {
        handleError("This account uses google authentication.", 403);
      }
      const { old_password, new_password } = req.body;
      if (await isPasswordCorrect(old_password, user?.password!)) {
        const hashedPassword = await hashPassword(new_password);
        await UserService.editUser(
          { password: hashedPassword },
          { where: { id: user?.id } }
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
  },

  authProfile: async (
    req: Request,
    res: Response<IResponse<UserResponse>, {}>,
    next: NextFunction
  ) => {
    try {
      const user = await getLoggedUser(req);
      let profile_url;
      if (!user) {
        return handleError("access forbidden", 403);
      }
      if (user && user?.avatar) {
        profile_url = await getImage(user?.avatar);
      }
      return res.status(200).json({
        success: true,
        data:mapUserRole(user,profile_url),
      });
    } catch (err) {
      next(err);
    }
  },
};
