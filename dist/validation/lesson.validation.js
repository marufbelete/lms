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
const joi_1 = __importDefault(require("joi"));
const lesson_1 = require("../service/lesson");
const common_1 = require("../helpers/common");
const validateAddLessonInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, common_1.lessonMaxWeightFilter)(input.course_id);
    const maxWeight = yield (0, lesson_1.getLessonMaxWeightToAssign)(filter);
    const addLessonSchema = joi_1.default.object({
        description: joi_1.default.string().required(),
        course_id: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        weight: joi_1.default.number().max(maxWeight).required(),
    });
    return addLessonSchema.validateAsync(input);
});
const validateUpdateLessonInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, common_1.lessonMaxWeightUpdateFilter)(input.course_id, input.lesson_id);
    const maxWeight = yield (0, lesson_1.getLessonMaxWeightToAssign)(filter);
    const updateLessonSchema = joi_1.default.object({
        lesson_id: joi_1.default.any().required(),
        description: joi_1.default.string(),
        title: joi_1.default.string(),
        course_id: joi_1.default.string().required(),
        weight: joi_1.default.number().max(maxWeight),
    });
    return updateLessonSchema.validateAsync(input);
});
module.exports = {
    validateAddLessonInput,
    validateUpdateLessonInput
};
//# sourceMappingURL=lesson.validation.js.map