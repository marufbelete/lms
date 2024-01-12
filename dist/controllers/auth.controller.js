"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
// const axios from "axios");
const bruteprotect_1 = __importDefault(require("../helpers/bruteprotect"));
const user_validation_1 = require("../validation/user.validation");
const handleError_1 = require("../helpers/handleError");
const email_1 = require("../constant/email");
const user_1 = require("../helpers/user");
const config_1 = __importDefault(require("../config/config"));
const user_2 = require("../service/user");
const role_1 = require("../service/role");
const role_2 = require("../constant/role");
const common_1 = require("../helpers/common");
const models_1 = __importDefault(require("../models"));
const role_model_1 = require("../models/role.model");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password, role_id, username } = req.body;
            console.log(req.body);
            const { error } = user_validation_1.signupUserSchema.validate(Object.assign({}, req.body));
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const token = yield (0, user_1.issueToken)({ email: email }, config_1.default.ACCESS_TOKEN_SECRET);
            const mailOptions = (0, email_1.accountConfirmationEmail)(email, username, token);
            // if (await isEmailExist(email)) {
            //   if (await isEmailVerified({ email })) {
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
            //     const access_token = await issueToken(
            //       { sub: edited_user?.id, email: edited_user.email },
            //       config.ACCESS_TOKEN_SECRET,
            //       { expiresIn: config.ACCESS_TOKEN_EXPIRES }
            //     );
            //     const info = getAuthInfo(edited_user, role, access_token);
            //     return res.json({ success: true, info });
            //   }
            // }
            const hashedPassword = yield (0, user_1.hashPassword)(password);
            const user_to_add = Object.assign(Object.assign({}, req.body), { is_local_auth: true, password: hashedPassword });
            // let profile_url
            // if(req.file){
            //   const key = await saveImage(req,config.AWS_PROFILE_FOLDER)
            //   profile_url= await getImage(key)
            //   user_to_add.avatar=key
            // }
            const user = yield (0, user_2.insertUser)(user_to_add, { transaction: t });
            let role = null;
            if (role_id) {
                role = yield (0, role_1.fetchRole)({ where: { id: role_id } });
            }
            if (!role) {
                role = yield (0, role_1.fetchRole)({
                    where: {
                        name: role_2.ROLE.STUDENT,
                    },
                });
            }
            yield user.$add('role', role, { transaction: t });
            // await sendEmail(mailOptions);
            const access_token = yield (0, user_1.issueToken)({ sub: user === null || user === void 0 ? void 0 : user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
            // const user_roles = await user.$get('roles',{transaction: t });
            // console.log(user_roles)
            // console.log(user_roles[0].user_role)
            //it only understand the instance role and gives 
            //users as array but it will only have one user
            // b/c he instance role is from a given user
            // console.log(await user_roles[0].$get('users'),{transaction: t });
            // console.log(user_roles[0].user_roles);
            // console.log(user_roles[0].user_role);
            // user.avatar=profile_url
            console.log(user);
            yield user.reload({ include: [{
                        model: role_model_1.Role,
                        through: { attributes: ['is_active'] }
                    }], transaction: t });
            console.log(user);
            const info = (0, common_1.getAuthInfo)(user, access_token);
            return res
                .status(201)
                .cookie("access_token", access_token, {
                sameSite: "none",
                path: "/",
                secure: true,
                httpOnly: true
            })
                .json({ success: true, auth: true, info });
        }));
    }
    catch (err) {
        next(err);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.body;
        const { error } = user_validation_1.loginUserSchema.validate(param);
        if (error) {
            (0, handleError_1.handleError)(error.message, 403);
        }
        const { email, password } = param;
        const user = yield (0, common_1.isEmailExist)(email);
        if (user) {
            if (yield (0, user_1.isPasswordCorrect)(password, user.password)) {
                const access_token = param.remember_me
                    ? yield (0, user_1.issueToken)({ sub: user === null || user === void 0 ? void 0 : user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.LONG_ACCESS_TOKEN_EXPIRY })
                    : yield (0, user_1.issueToken)({ sub: user === null || user === void 0 ? void 0 : user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
                // const role_info = await user.$get('roles',{
                //   include:{
                //     through:{attributes:['is_active']}
                //   }
                //show only seleted attribute from through table
                // });
                console.log(user);
                // console.log(role_info[0].user_role)
                // let profile_url=null
                // if(user.avatar)profile_url= await getImage(user.avatar)
                // user.avatar=profile_url
                const info = (0, common_1.getAuthInfo)(user, access_token);
                bruteprotect_1.default.reset(req);
                // console.log(req.session.user)
                // req.session.destroy();
                //totaly remove session configuration
                // console.log(req.session)
                req.session.user = user;
                console.log(req.session.user);
                return res
                    .status(200)
                    // .cookie("access_token", access_token, {
                    //   sameSite: "none",
                    //   path: "/",
                    //   secure: true,
                    //   httpOnly: true,
                    // })
                    .json({ success: true, auth: true, info });
            }
            (0, handleError_1.handleError)("Username or Password Incorrect", 400);
        }
        (0, handleError_1.handleError)("Username or Password Incorrect", 400);
    }
    catch (err) {
        next(err);
    }
});
exports.loginUser = loginUser;
// exports.forumLogin = async (req, res, next) => {
//   try {
//     const { username, email } = req.body;
//     const forumApiUrl = `https://forum.sorobanlearn.com/register/setauthtoken/?type=json&apikey=${config.FORUM_API_KEY}&user=${username}&email=${email}`;
//     const response = await axios.get(forumApiUrl, {
//       headers: {
//         "Content-Type": "application/json",
//         // Other headers like authorization if required
//       },
//     });
//     res.json(response.data);
//   } catch (err) {
//     console.error("Error:", err.message);
//     next(err);
//   }
// };
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // req.session.destroy();
        console.log((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.user);
        if (!((_b = req === null || req === void 0 ? void 0 : req.session) === null || _b === void 0 ? void 0 : _b.user))
            return res.json({ message: "auth required" });
        //  test
        return res
            .status(200)
            // .clearCookie("access_token", {
            //   sameSite: "none",
            //   path: "/",
            //   secure: true,
            //   httpOnly: true,
            // })
            .json({
            success: true,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutUser = logoutUser;
// export const confirmEmail = async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     const { verifyToken } = req.query;
//     const user = await isTokenValid(verifyToken, config.ACCESS_TOKEN_SECRET);
//     if (user) {
//       const filter = { where: { email: user.email } };
//       const userInfo = await fetchUser(filter);
//       userInfo.is_email_confirmed = true;
//       const access_token = await issueToken(
//         { sub: userInfo?.id, email: userInfo.email },
//         config.ACCESS_TOKEN_SECRET,
//         { expiresIn: config.ACCESS_TOKEN_EXPIRES }
//       );
//       const role_info = await userInfo.getRoles({
//         joinTableAttributes: ["is_active"],
//       });
//       const info = getAuthInfo(userInfo, role_info, access_token);
//       await userInfo.save();
//       return res
//         .status(200)
//         .cookie("access_token", access_token, {
//           sameSite: "none",
//           path: "/",
//           secure: true,
//           httpOnly: true,
//         })
//         .json({ success: true, auth: true, info });
//     }
//     handleError("erro user not exist", 403);
//   } catch (err) {
//     next(err);
//   }
// };
// export const changePassword = async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     const param = req.body;
//     const { error } = changePasswordSchema.validate(param);
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const user = await getLoggedUser(req);
//     if (!user) {
//       handleError("please login!", 403);
//     }
//     if (!user.is_local_auth) {
//       handleError("This account uses google authentication.", 403);
//     }
//     const { old_password, new_password } = req.body;
//     if (await isPasswordCorrect(old_password, user.password)) {
//       const hashedPassword = await hashPassword(new_password);
//       await editUser({ password: hashedPassword }, { where: { id: user.id } });
//       bouncer.reset(req);
//       return res.json({
//         message: "password successfully changed",
//         success: true,
//       });
//     }
//     handleError("old password not correct", 403);
//   } catch (err) {
//     next(err);
//   }
// };
// export const authProfile = async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     const user=await getLoggedUser(req)
//     delete user.dataValues.password
//     const role_info = await user.getRoles({
//       joinTableAttributes: ["is_active"],
//     });
//     user.dataValues.role_info=roleMap(role_info)
//     let profile_url=null
//     // if(user.avatar)profile_url= await getImage(user.avatar)
//     // user.dataValues.avatar=profile_url
//     return res
//       .status(200)
//       .json({
//         success: true,
//         user
//       });
//   } catch (err) {
//     next(err);
//   }
// };
//# sourceMappingURL=auth.controller.js.map