import Joi from "joi";
import { ExerciseService } from "../service/index.service";
import {
  exerciseMaxWeightUpdateFilter,
  exerciseMaxWeightFilter,
} from "../helpers/common";

export const validateAddExerciseInput = async (input: any) => {
  const filter = exerciseMaxWeightFilter(input.lesson_id);
  const maxWeight = await ExerciseService.getExerciseMaxWeightToAssign(
    filter,
    input.lesson_id
  );
  const addExerciseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    lesson_id: Joi.string().required(),
    weight: Joi.number().max(maxWeight).required(),
    instruction: Joi.string().required(),
    stepValidation: Joi.object({
      type: Joi.string().required(),
      input: Joi.string().required(),
      error_message: Joi.string().required(),
      success_message: Joi.string().required(),
    }).optional(),
  });
  return addExerciseSchema.validateAsync(input);
};

export const validateUpdateExerciseInput = async (input: any) => {
  const filter = exerciseMaxWeightUpdateFilter(
    input.exercise_id,
    input.lesson_id
  );
  const maxWeight = await ExerciseService.getExerciseMaxWeightToAssign(
    filter,
    input.lesson_id
  );
  const updateExerciseSchema = Joi.object({
    exercise_id: Joi.any().required(),
    lesson_id: Joi.any().required(),
    title: Joi.string(),
    description: Joi.string(),
    weight: Joi.number().max(maxWeight),
    instruction: Joi.string(),
    stepValidation: Joi.object({
      type: Joi.string().required(),
      input: Joi.string().required(),
      error_message: Joi.string().required(),
      success_message: Joi.string().required(),
    }).optional(),
  });

  return updateExerciseSchema.validateAsync(input);
};

export const completeExerciseSchema = Joi.object({
  exercise_id: Joi.any().required(),
  type: Joi.any().required(),
  input: Joi.string().required(),
});
