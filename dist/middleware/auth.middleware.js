"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const handleError_1 = require("../helpers/handleError");
const authenticateJWT = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!token) {
            (0, handleError_1.handleError)("please login", 403);
        }
        const user = jsonwebtoken_1.default.verify(token, config_1.default.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
        return;
    }
    catch (error) {
        if (error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError") {
            error.message = "Invalid token.";
            error.statusCode = 401;
        }
        next(error);
    }
};
exports.authenticateJWT = authenticateJWT;
