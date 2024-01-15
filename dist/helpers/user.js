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
exports.mapUserRole = exports.userIp = exports.getLoggedUser = exports.isEmailVerified = exports.isTokenValid = exports.issueToken = exports.isPasswordCorrect = exports.hashPassword = exports.isEmailExist = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = require("argon2");
const index_service_1 = require("../service/index.service");
const isEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_service_1.UserService.fetchUser({
        where: { email: email }
    }, { scope: 'user_role_state' });
    return user;
});
exports.isEmailExist = isEmailExist;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, argon2_1.hash)(password);
});
exports.hashPassword = hashPassword;
const isPasswordCorrect = (password, hashedPassword) => {
    return (0, argon2_1.verify)(hashedPassword, password);
};
exports.isPasswordCorrect = isPasswordCorrect;
const issueToken = function (payload, secret, option = {}) {
    const token = jsonwebtoken_1.default.sign(payload, secret, Object.assign({}, option));
    return token;
};
exports.issueToken = issueToken;
const isTokenValid = function (token, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = jsonwebtoken_1.default.verify(token, secret);
        return user;
    });
};
exports.isTokenValid = isTokenValid;
const isEmailVerified = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_service_1.UserService.fetchUser(filter);
    return user === null || user === void 0 ? void 0 : user.is_email_confirmed;
});
exports.isEmailVerified = isEmailVerified;
const getLoggedUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { sub } = req.user;
    const user = yield index_service_1.UserService.fetchUserById(sub, { scope: 'user_role_state' });
    return user;
});
exports.getLoggedUser = getLoggedUser;
const userIp = (request) => {
    let ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress;
    return ip;
};
exports.userIp = userIp;
const mapUserRole = (user, image) => {
    var _a;
    console.log(user);
    const transformedObject = Object.assign(Object.assign({}, user.dataValues), { image: image, roles: (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map(role => {
            var _a;
            return ({
                id: role.id,
                name: role.name,
                is_active: ((_a = role.user_role) === null || _a === void 0 ? void 0 : _a.is_active) || false
            });
        }) });
    delete transformedObject.password;
    return transformedObject;
};
exports.mapUserRole = mapUserRole;
//# sourceMappingURL=user.js.map