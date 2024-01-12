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
exports.fetchUserById = exports.fetchUser = exports.editUser = exports.insertUser = void 0;
const user_model_1 = require("../models/user.model");
const insertUser = (param, transaction = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const new_user = new user_model_1.User(param);
    const result = yield new_user.save(Object.assign({}, transaction));
    return result;
});
exports.insertUser = insertUser;
const editUser = (param, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.update(param, filter);
    return result;
});
exports.editUser = editUser;
const fetchUser = (filter, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options === null || options === void 0 ? void 0 : options.scope) {
        const result = yield user_model_1.User.scope(options.scope).findOne(filter);
        return result;
    }
    const result = yield user_model_1.User.findOne(filter);
    return result;
});
exports.fetchUser = fetchUser;
const fetchUserById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByPk(user_id);
    return result;
});
exports.fetchUserById = fetchUserById;
//# sourceMappingURL=user.js.map