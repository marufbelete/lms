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
const jwt = require("jsonwebtoken");
const util = require('util');
const { handleError } = require("../helpers/handleError");
const asyncVerify = util.promisify(jwt.verify);
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //   console.log(req.session.user)
        // if (!req.session.user?.id) {
        //   return res.status(401).json({ message: 'Unauthorized' });
        // }
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!token) {
            handleError("please login", 403);
        }
        const user = yield asyncVerify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
        return;
    }
    catch (error) {
        next(error);
    }
});
module.exports = { authenticateJWT };
//# sourceMappingURL=auth.middleware.js.map