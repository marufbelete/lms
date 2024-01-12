"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.addCourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const addCourseSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string(),
});
exports.addCourseSchema = addCourseSchema;
const updateCourseSchema = joi_1.default.object({
    id: joi_1.default.any().required(),
    title: joi_1.default.string(),
    description: joi_1.default.string(),
});
exports.updateCourseSchema = updateCourseSchema;
//# sourceMappingURL=course.validation.js.map