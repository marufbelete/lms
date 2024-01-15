"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.addCourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addCourseSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    estimatedTime: joi_1.default.string(),
    difficulty: joi_1.default.string(),
    collectionId: joi_1.default.string(),
    prerequisiteIds: joi_1.default.array()
});
exports.updateCourseSchema = joi_1.default.object({
    id: joi_1.default.any().required(),
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    estimatedTime: joi_1.default.string(),
    difficulty: joi_1.default.string(),
    collectionId: joi_1.default.string(),
    prerequisiteIds: joi_1.default.array()
});
//# sourceMappingURL=course.validation.js.map