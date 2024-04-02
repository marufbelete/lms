"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserRole = exports.userIp = exports.getLoggedUser = exports.isEmailVerified = exports.isTokenValid = exports.issueToken = exports.isPasswordCorrect = exports.hashPassword = exports.isEmailExist = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = require("argon2");
const index_service_1 = require("../service/index.service");
const isEmailExist = async (email) => {
    const user = await index_service_1.UserService.fetchUser({
        where: { email: email },
    }, { scope: "user_role_state" });
    return user;
};
exports.isEmailExist = isEmailExist;
const hashPassword = async (password) => {
    return await (0, argon2_1.hash)(password);
};
exports.hashPassword = hashPassword;
const isPasswordCorrect = (password, hashedPassword) => {
    return (0, argon2_1.verify)(hashedPassword, password);
};
exports.isPasswordCorrect = isPasswordCorrect;
const issueToken = function (payload, secret, option = {}) {
    const token = jsonwebtoken_1.default.sign(payload, secret, { ...option });
    return token;
};
exports.issueToken = issueToken;
const isTokenValid = async function (token, secret) {
    const user = jsonwebtoken_1.default.verify(token, secret);
    return user;
};
exports.isTokenValid = isTokenValid;
const isEmailVerified = async (filter) => {
    const user = await index_service_1.UserService.fetchUser(filter);
    return user === null || user === void 0 ? void 0 : user.is_email_confirmed;
};
exports.isEmailVerified = isEmailVerified;
const getLoggedUser = async (req) => {
    const { sub } = req.user;
    const user = await index_service_1.UserService.fetchUserById(sub, {
        scope: "user_role_state",
    });
    return user;
};
exports.getLoggedUser = getLoggedUser;
const userIp = (request) => {
    let ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress;
    return ip;
};
exports.userIp = userIp;
const mapUserRole = (user, image) => {
    var _a;
    const transformedObject = {
        ...user.dataValues,
        image: image,
        roles: (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map((role) => {
            var _a;
            return ({
                id: role.id,
                name: role.name,
                is_active: ((_a = role.user_role) === null || _a === void 0 ? void 0 : _a.is_active) || false,
            });
        }),
    };
    delete transformedObject.password;
    return transformedObject;
};
exports.mapUserRole = mapUserRole;
