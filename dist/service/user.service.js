"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
    static async insertUser(param, transaction = {}) {
        const new_user = new user_model_1.User(param);
        return new_user.save({ ...transaction });
    }
    static async editUser(param, filter) {
        return user_model_1.User.update(param, filter);
    }
    static async fetchUsers(filter, options) {
        if (options === null || options === void 0 ? void 0 : options.scope) {
            return user_model_1.User.scope(options.scope).findAll(filter);
        }
        return user_model_1.User.findAll(filter);
    }
    static async fetchUser(filter, options) {
        if (options === null || options === void 0 ? void 0 : options.scope) {
            return user_model_1.User.scope(options.scope).findOne(filter);
        }
        return user_model_1.User.findOne(filter);
    }
    static async fetchUserById(user_id, options) {
        if (options === null || options === void 0 ? void 0 : options.scope) {
            return user_model_1.User.scope(options.scope).findByPk(user_id);
        }
        return user_model_1.User.findByPk(user_id);
    }
}
exports.UserService = UserService;
