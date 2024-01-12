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
const user_1 = require("../helpers/user");
const sequelize_1 = require("sequelize");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const config_1 = __importDefault(require("../config/config"));
const role_1 = require("../constant/role");
const role_2 = require("../service/role");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const googleStrategy = new GoogleStrategy({
    clientID: config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config_1.default.BASE_URL}/auth/google/callback`,
}, function (accessToken, refreshToken, profile, done) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = {
                first_name: (_a = profile === null || profile === void 0 ? void 0 : profile._json) === null || _a === void 0 ? void 0 : _a.given_name,
                last_name: (_b = profile === null || profile === void 0 ? void 0 : profile._json) === null || _b === void 0 ? void 0 : _b.family_name,
                email: (_c = profile === null || profile === void 0 ? void 0 : profile._json) === null || _c === void 0 ? void 0 : _c.email,
                google_id: (_d = profile === null || profile === void 0 ? void 0 : profile._json) === null || _d === void 0 ? void 0 : _d.sub,
                is_email_confirmed: (_e = profile === null || profile === void 0 ? void 0 : profile._json) === null || _e === void 0 ? void 0 : _e.email_verified
            };
            const [user, created] = yield user_model_1.User.findOrCreate({
                where: {
                    [sequelize_1.Op.or]: [
                        { google_id: userInfo.google_id },
                        { email: userInfo.email },
                    ],
                },
                defaults: userInfo,
            });
            if (created) {
                const role = yield (0, role_2.fetchRole)({
                    where: {
                        name: role_1.ROLE.STUDENT
                    }
                });
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
// passport.serializeUser(function(user, cb) {
//   console.log(user)
//   process.nextTick(function() {
//     return cb(null, {
//       id: user.id,
//       username: user.username,
//       picture: user.picture
//     });
//   });
// });
// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });
const issueGoogleToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const access_token = yield (0, user_1.issueToken)({ sub: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id, email: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES });
        return res
            .cookie("access_token", {
            sameSite: "none",
            path: "/",
            secure: true,
            httpOnly: true,
        })
            .redirect(`${config_1.default.FE_URL}/dashboard?auth=true&type=google
      &first_name=${(_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.first_name}&last_name=${(_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.last_name}
      &email=${(_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.email}&access_token=${access_token}`);
    }
    catch (err) {
        next(err);
    }
});
exports.issueGoogleToken = issueGoogleToken;
//# sourceMappingURL=google.js.map