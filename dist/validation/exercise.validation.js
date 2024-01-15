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
exports.completeExerciseSchema = exports.validateUpdateExerciseInput = exports.validateAddExerciseInput = void 0;
const joi_1 = __importDefault(require("joi"));
const index_service_1 = require("../service/index.service");
const common_1 = require("../helpers/common");
const validateAddExerciseInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, common_1.exerciseMaxWeightFilter)(input.lesson_id);
    const maxWeight = yield index_service_1.ExerciseService.getExerciseMaxWeightToAssign(filter, input.lesson_id);
    const addExerciseSchema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string(),
        lesson_id: joi_1.default.string().required(),
        weight: joi_1.default.number().max(maxWeight).required(),
        instruction: joi_1.default.string().required(),
        stepValidation: joi_1.default.object({
            type: joi_1.default.string().required(),
            input: joi_1.default.string().required(),
            error_message: joi_1.default.string().required(),
            success_message: joi_1.default.string().required(),
        }).optional(),
    });
    return addExerciseSchema.validateAsync(input);
});
exports.validateAddExerciseInput = validateAddExerciseInput;
const validateUpdateExerciseInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, common_1.exerciseMaxWeightUpdateFilter)(input.exercise_id, input.lesson_id);
    const maxWeight = yield index_service_1.ExerciseService.getExerciseMaxWeightToAssign(filter, input.lesson_id);
    const updateExerciseSchema = joi_1.default.object({
        exercise_id: joi_1.default.any().required(),
        lesson_id: joi_1.default.any().required(),
        title: joi_1.default.string(),
        description: joi_1.default.string(),
        weight: joi_1.default.number().max(maxWeight),
        instruction: joi_1.default.string(),
        stepValidation: joi_1.default.object({
            type: joi_1.default.string().required(),
            input: joi_1.default.string().required(),
            error_message: joi_1.default.string().required(),
            success_message: joi_1.default.string().required(),
        }).optional(),
    });
    return updateExerciseSchema.validateAsync(input);
});
exports.validateUpdateExerciseInput = validateUpdateExerciseInput;
exports.completeExerciseSchema = joi_1.default.object({
    exercise_id: joi_1.default.any().required(),
    type: joi_1.default.any().required(),
    input: joi_1.default.string().required()
});
//# sourceMappingURL=exercise.validation.js.map