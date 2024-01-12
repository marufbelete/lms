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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedUser = exports.isTokenValid = exports.userIp = exports.hashPassword = exports.issueToken = exports.isEmailVerified = exports.isPasswordCorrect = void 0;
const jwt = require("jsonwebtoken");
const argon2_1 = require("argon2");
const { fetchUser, fetchUserById } = require("../service/user");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, argon2_1.hash)(password);
});
exports.hashPassword = hashPassword;
const isPasswordCorrect = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, argon2_1.verify)(hashedPassword, password);
});
exports.isPasswordCorrect = isPasswordCorrect;
const issueToken = function (param, key, expirey = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign(param, key, Object.assign({}, expirey));
        return token;
    });
};
exports.issueToken = issueToken;
const isTokenValid = function (token, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = jwt.verify(token, secret);
        return user;
    });
};
exports.isTokenValid = isTokenValid;
const isEmailVerified = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield fetchUser({ where: Object.assign({}, param) });
    return user === null || user === void 0 ? void 0 : user.is_email_confirmed;
});
exports.isEmailVerified = isEmailVerified;
const getLoggedUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
    const user = yield fetchUserById(id);
    return user;
});
exports.getLoggedUser = getLoggedUser;
const userIp = (request) => {
    let ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress;
    return ip;
};
exports.userIp = userIp;
//# sourceMappingURL=user.js.map