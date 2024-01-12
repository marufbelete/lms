"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = require("./user.model");
const role_model_1 = require("./role.model");
const user_role_model_1 = require("./user_role.model");
const sequelize = config_1.default.DB_URL ?
    new sequelize_typescript_1.Sequelize(config_1.default.DB_URL, {
        logging: true,
        models: [user_model_1.User, role_model_1.Role, user_role_model_1.User_Role]
    })
    : new sequelize_typescript_1.Sequelize({
        database: config_1.default.DB_NAME,
        dialect: config_1.default.DB_DIALECT,
        username: config_1.default.DB_USER,
        password: config_1.default.DB_PASSWORD,
        logging: true,
        models: [user_model_1.User, role_model_1.Role, user_role_model_1.User_Role]
    });
exports.default = sequelize;
//# sourceMappingURL=index.js.map