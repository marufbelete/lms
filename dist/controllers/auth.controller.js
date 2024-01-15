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
const bruteprotect_1 = __importDefault(require("../helpers/bruteprotect"));
const user_validation_1 = require("../validation/user.validation");
const handleError_1 = require("../helpers/handleError");
const email_1 = require("../constant/email");
const user_1 = require("../helpers/user");
const config_1 = __importDefault(require("../config/config"));
const index_service_1 = require("../service/index.service");
const role_1 = require("../constant/role");
const models_1 = __importDefault(require("../models"));
const role_model_1 = require("../models/role.model");
const file_1 = require("../helpers/file");
const axios_1 = __importDefault(require("axios"));
exports.default = {
    registerUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                const { email, password, role_id, username } = req.body;
                const { error } = user_validation_1.signupUserSchema.validate(Object.assign({}, req.body));
                if (error) {
                    (0, handleError_1.handleError)(error.message, 400);
                }
                const token = (0, user_1.issueToken)({ email: email }, config_1.default.ACCESS_TOKEN_SECRET);
                const mailOptions = (0, email_1.accountConfirmationEmail)(email, username, token);
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
                const hashedPassword = yield (0, user_1.hashPassword)(password);
                const user_to_add = Object.assign(Object.assign({}, req.body), { is_local_auth: true, password: hashedPassword });
                let profile_url;
                if (req.file) {
                    const key = yield (0, file_1.saveImage)(req.file, config_1.default.AWS_PROFILE_FOLDER);
                    profile_url = yield (0, file_1.getImage)(key);
                    user_to_add.avatar = key;
                }
                const user = yield index_service_1.UserService.insertUser(user_to_add, {
                    transaction: t,
                });
                const role_filter = role_id ? { where: { id: role_id } } : { where: { name: role_1.ROLE.STUDENT } };
                const role = yield index_service_1.RoleService.fetchRole(role_filter);
                if (!role) {
                    return (0, handleError_1.handleError)("role not found", 404);
                }
                yield user.$add("role", role, { transaction: t });
                // await sendEmail(mailOptions);
                const access_token = (0, user_1.issueToken)({ sub: user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
                // const user_roles = await user.$get('roles',{transaction: t });
                // console.log(user_roles)
                // console.log(user_roles[0].user_role)
                //it only understand the instance role and gives
                //users as array but it will only have one user
                // b/c he instance role is from a given user
                // console.log(await user_roles[0].$get('users'),{transaction: t });
                // console.log(user_roles[0].user_roles);
                // console.log(user_roles[0].user_role);
                yield user.reload({
                    include: [
                        {
                            model: role_model_1.Role,
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
                    .json({ data: (0, user_1.mapUserRole)(user, profile_url), success: true });
            }));
        }
        catch (err) {
            next(err);
        }
    }),
    loginUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const param = req.body;
            const { error } = user_validation_1.loginUserSchema.validate(param);
            if (error) {
                (0, handleError_1.handleError)(error.message, 400);
            }
            const { email, password } = param;
            const user = yield (0, user_1.isEmailExist)(email);
            if (user) {
                if (yield (0, user_1.isPasswordCorrect)(password, user.password)) {
                    const access_token = param.remember_me
                        ? (0, user_1.issueToken)({ sub: user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.LONG_ACCESS_TOKEN_EXPIRY })
                        : (0, user_1.issueToken)({ sub: user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
                    let profile_url;
                    if (user.avatar)
                        profile_url = yield (0, file_1.getImage)(user.avatar);
                    bruteprotect_1.default.reset(req);
                    return res
                        .status(200)
                        .cookie("access_token", access_token, {
                        sameSite: "none",
                        path: "/",
                        secure: true,
                        httpOnly: true,
                    })
                        .json({ data: (0, user_1.mapUserRole)(user, profile_url), success: true });
                }
                (0, handleError_1.handleError)("Username or Password Incorrect", 401);
            }
            (0, handleError_1.handleError)("Username or Password Incorrect", 401);
        }
        catch (err) {
            next(err);
        }
    }),
    forumLogin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email } = req.body;
            const forumApiUrl = `https://forum.sorobanlearn.com/register/setauthtoken/?type=json&apikey=${config_1.default.FORUM_API_KEY}&user=${username}&email=${email}`;
            const response = yield axios_1.default.get(forumApiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    // Other headers like authorization if required
                },
            });
            res.json(response.data);
        }
        catch (err) {
            next(err);
        }
    }),
    logoutUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        catch (err) {
            next(err);
        }
    }),
    confirmEmail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { verifyToken } = req.query;
            const user = yield (0, user_1.isTokenValid)(verifyToken, config_1.default.ACCESS_TOKEN_SECRET);
            if (user) {
                const filter = { where: { id: user === null || user === void 0 ? void 0 : user.sub } };
                const userInfo = yield index_service_1.UserService.fetchUser(filter, {
                    scope: "user_role_state",
                });
                if (!userInfo) {
                    return (0, handleError_1.handleError)("user not found", 404);
                }
                userInfo.is_email_confirmed = true;
                const access_token = (0, user_1.issueToken)({ sub: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id, email: userInfo.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
                yield userInfo.save();
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
            (0, handleError_1.handleError)("erro user not exist", 403);
        }
        catch (err) {
            next(err);
        }
    }),
    changePassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const param = req.body;
            const { error } = user_validation_1.changePasswordSchema.validate(param);
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = yield (0, user_1.getLoggedUser)(req);
            if (!user) {
                return (0, handleError_1.handleError)("please login!", 403);
            }
            if (user === null || user === void 0 ? void 0 : user.is_local_auth) {
                (0, handleError_1.handleError)("This account uses google authentication.", 403);
            }
            const { old_password, new_password } = req.body;
            if (yield (0, user_1.isPasswordCorrect)(old_password, user === null || user === void 0 ? void 0 : user.password)) {
                const hashedPassword = yield (0, user_1.hashPassword)(new_password);
                yield index_service_1.UserService.editUser({ password: hashedPassword }, { where: { id: user === null || user === void 0 ? void 0 : user.id } });
                bruteprotect_1.default.reset(req);
                return res.json({
                    message: "password successfully changed",
                    success: true,
                });
            }
            (0, handleError_1.handleError)("old password not correct", 403);
        }
        catch (err) {
            next(err);
        }
    }),
    authProfile: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.getLoggedUser)(req);
            let profile_url;
            if (!user) {
                return (0, handleError_1.handleError)("access forbidden", 403);
            }
            if (user && (user === null || user === void 0 ? void 0 : user.avatar)) {
                profile_url = yield (0, file_1.getImage)(user === null || user === void 0 ? void 0 : user.avatar);
            }
            return res.status(200).json({
                success: true,
                data: (0, user_1.mapUserRole)(user, profile_url),
            });
        }
        catch (err) {
            next(err);
        }
    }),
};
//# sourceMappingURL=auth.controller.js.map