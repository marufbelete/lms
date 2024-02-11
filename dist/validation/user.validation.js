"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.courseToLoggedUserSchema = exports.lessonIdSchema = exports.courseToUserSchema = exports.roleToUserSchema = exports.loginUserSchema = exports.updateUserSchema = exports.signupUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupUserSchema = joi_1.default.object({
    first_name: joi_1.default.string(),
    last_name: joi_1.default.string(),
    email: joi_1.default.string().required().email(),
    username: joi_1.default.string(),
    subscribed_to_newsletter: joi_1.default.string(),
    avatar: joi_1.default.string(),
    password: joi_1.default.string().min(8).required(),
    role_id: joi_1.default.string(),
});
exports.updateUserSchema = joi_1.default.object({
    first_name: joi_1.default.string(),
    last_name: joi_1.default.string(),
    avatar: joi_1.default.string(),
    email: joi_1.default.string().email(),
    username: joi_1.default.string(),
    subscribed_to_newsletter: joi_1.default.string(),
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.required(),
});
exports.roleToUserSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    role_id: joi_1.default.string().required(),
});
exports.courseToUserSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    course_id: joi_1.default.string().required(),
});
exports.lessonIdSchema = joi_1.default.object({
    lesson_id: joi_1.default.string().required(),
});
exports.courseToLoggedUserSchema = joi_1.default.object({
    course_id: joi_1.default.string().required(),
});
exports.changePasswordSchema = joi_1.default.object({
    old_password: joi_1.default.string().required(),
    new_password: joi_1.default.string().required(),
});
//# sourceMappingURL=user.validation.js.map