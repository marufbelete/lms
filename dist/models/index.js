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
const lesson_model_1 = require("./lesson.model");
const lesson_user_model_1 = require("./lesson_user.model");
const prerequisite_model_1 = require("./prerequisite.model");
const course_model_1 = require("./course.model");
const course_user_model_1 = require("./course_user.model");
const collection_model_1 = require("./collection.model");
const collection_user_1 = require("./collection_user");
const step_validation_model_1 = require("./step_validation.model");
const exercise_model_1 = require("./exercise.model");
const exercise_user_model_1 = require("./exercise_user.model");
console.log(config_1.default.DB_URL);
const sequelize = config_1.default.DB_URL
    ? new sequelize_typescript_1.Sequelize(config_1.default.DB_URL, {
        logging: false,
        // dialectOptions: {
        //   ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        //   },
        // },
        pool: {
            max: 20,
            min: 0,
            idle: 10000,
            acquire: 1000,
        },
        models: [
            user_model_1.User,
            role_model_1.Role,
            user_role_model_1.User_Role,
            lesson_model_1.Lesson,
            lesson_user_model_1.Lesson_User,
            prerequisite_model_1.Prerequisite,
            course_model_1.Course,
            exercise_model_1.Exercise,
            course_user_model_1.Course_User,
            collection_model_1.Collection,
            collection_user_1.Collection_User,
            step_validation_model_1.StepValidation,
            exercise_user_model_1.Exercise_User,
        ],
    })
    : new sequelize_typescript_1.Sequelize({
        database: config_1.default.DB_NAME,
        dialect: config_1.default.DB_DIALECT,
        username: config_1.default.DB_USER,
        password: config_1.default.DB_PASSWORD,
        logging: false,
        // dialectOptions: {
        //   ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        //   },
        // },
        models: [
            user_model_1.User,
            role_model_1.Role,
            user_role_model_1.User_Role,
            lesson_model_1.Lesson,
            lesson_user_model_1.Lesson_User,
            prerequisite_model_1.Prerequisite,
            course_model_1.Course,
            exercise_model_1.Exercise,
            course_user_model_1.Course_User,
            collection_model_1.Collection,
            collection_user_1.Collection_User,
            step_validation_model_1.StepValidation,
            exercise_user_model_1.Exercise_User,
        ],
        pool: {
            max: 20,
            min: 0,
            idle: 10000,
            acquire: 1000,
        },
    });
exports.default = sequelize;
