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
exports.loginStrategy = void 0;
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = require("../service/user");
const localStrategy = passport_local_1.default.Strategy;
// import {  ExtractJwt} from 'passport-jwt';
const user_2 = require("../helpers/user");
// import { User } from '../models/user.model';
const loginStrategy = new localStrategy({ usernameField: 'email' }, function (email, password, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.fetchUser)({ where: { email } });
            if (!user) {
                return cb({ message: 'No user found!!', statusCode: 400 }, null);
            }
            const userPassword = user.password;
            const isPasswordValid = (0, user_2.isPasswordCorrect)(password, userPassword);
            if (!isPasswordValid) {
                return cb({ message: 'Email or Password is incorrect', statusCode: 400 }, null);
            }
            const currentUser = user;
            cb(null, currentUser);
        }
        catch (error) {
            cb(error, null);
        }
    });
});
exports.loginStrategy = loginStrategy;
//# sourceMappingURL=local.js.map