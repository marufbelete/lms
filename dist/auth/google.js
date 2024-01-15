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
exports.issueGoogleToken = exports.googleStrategy = void 0;
const user_model_1 = require("../models/user.model");
const sequelize_1 = require("sequelize");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const config_1 = __importDefault(require("../config/config"));
const role_1 = require("../constant/role");
const index_service_1 = require("../service/index.service");
const user_1 = require("../helpers/user");
const handleError_1 = require("../helpers/handleError");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const googleStrategy = new GoogleStrategy({
    clientID: config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config_1.default.BASE_URL}/auth/google/callback`,
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                google_id: profile._json.sub,
                is_email_confirmed: profile._json.email_verified === "true" ? true : false
            };
            const [user, created] = yield user_model_1.User.findOrCreate({
                where: {
                    [sequelize_1.Op.or]: [
                        { google_id: userInfo.google_id },
                    ],
                },
                defaults: userInfo,
            });
            if (created) {
                const role = yield index_service_1.RoleService.fetchRole({
                    where: {
                        name: role_1.ROLE.STUDENT
                    }
                });
                if (!role) {
                    return (0, handleError_1.handleError)("default role found", 404);
                }
                yield user.$add('role', role);
            }
            done(null, user);
        }
        catch (err) {
            done(err, undefined);
        }
    });
});
exports.googleStrategy = googleStrategy;
const issueGoogleToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const access_token = (0, user_1.issueToken)({ sub: user.id, email: user.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
        return res
            .cookie("access_token", access_token, {
            sameSite: "none",
            path: "/",
            secure: true,
            httpOnly: true,
        })
            .redirect(`${config_1.default.FE_URL}/dashboard`);
    }
    catch (err) {
        next(err);
    }
});
exports.issueGoogleToken = issueGoogleToken;
//# sourceMappingURL=google.js.map