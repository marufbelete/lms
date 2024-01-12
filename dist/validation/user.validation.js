"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonIdSchema = exports.updateUserSchema = exports.changePasswordSchema = exports.courseToLoggedUserSchema = exports.courseToUserSchema = exports.roleToUserSchema = exports.loginUserSchema = exports.signupUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupUserSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    username: joi_1.default.string().required(),
    subscribed_to_newsletter: joi_1.default.string(),
    avatar: joi_1.default.string(),
    password: joi_1.default.string().min(8).required(),
    role_id: joi_1.default.string()
});
exports.signupUserSchema = signupUserSchema;
const updateUserSchema = joi_1.default.object({
    first_name: joi_1.default.string(),
    last_name: joi_1.default.string(),
    avatar: joi_1.default.string(),
});
exports.updateUserSchema = updateUserSchema;
const loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.required()
});
exports.loginUserSchema = loginUserSchema;
const roleToUserSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    role_id: joi_1.default.string().required()
});
exports.roleToUserSchema = roleToUserSchema;
const courseToUserSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    course_id: joi_1.default.string().required()
});
exports.courseToUserSchema = courseToUserSchema;
const lessonIdSchema = joi_1.default.object({
    lesson_id: joi_1.default.string().required()
});
exports.lessonIdSchema = lessonIdSchema;
const courseToLoggedUserSchema = joi_1.default.object({
    course_id: joi_1.default.string().required()
});
exports.courseToLoggedUserSchema = courseToLoggedUserSchema;
const changePasswordSchema = joi_1.default.object({
    old_password: joi_1.default.string().required(),
    new_password: joi_1.default.string().required()
});
exports.changePasswordSchema = changePasswordSchema;
//# sourceMappingURL=user.validation.js.map