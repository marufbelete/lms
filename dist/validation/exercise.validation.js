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
// import { getExerciseMaxWeightToAssign } from '../service/exercise';
// import { exerciseMaxWeightUpdateFilter, exerciseMaxWeightFilter } from '../helpers/common';
const validateAddExerciseInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter= exerciseMaxWeightFilter(input.lesson_id)
    // const maxWeight = await getExerciseMaxWeightToAssign(filter,input.lesson_id);
    const addExerciseSchema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string(),
        lesson_id: joi_1.default.string().required(),
        // weight: Joi.number().max(maxWeight).required(),
        instruction: joi_1.default.string().required(),
    });
    return addExerciseSchema.validateAsync(input);
});
const validateUpdateExerciseInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter= exerciseMaxWeightUpdateFilter(input.exercise_id,input.lesson_id)
    // const maxWeight = await getExerciseMaxWeightToAssign(filter,input.lesson_id);
    const updateExerciseSchema = joi_1.default.object({
        exercise_id: joi_1.default.any().required(),
        lesson_id: joi_1.default.any().required(),
        title: joi_1.default.string(),
        description: joi_1.default.string(),
        // weight: Joi.number().max(maxWeight),
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
const completeExerciseSchema = joi_1.default.object({
    exercise_id: joi_1.default.any().required(),
    type: joi_1.default.any().required(),
    input: joi_1.default.string().required()
});
module.exports = {
    validateAddExerciseInput,
    validateUpdateExerciseInput,
    completeExerciseSchema
};
//# sourceMappingURL=exercise.validation.js.map