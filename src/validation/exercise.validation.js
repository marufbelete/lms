const Joi = require('joi');
const { getExerciseMaxWeightToAssign } = require('../service/exercise');
const { exerciseMaxWeightUpdateFilter, exerciseMaxWeightFilter } = require('../helpers/common');

const validateAddExerciseInput = async (input) => {
    const filter= exerciseMaxWeightFilter(input.lesson_id)
    const maxWeight = await getExerciseMaxWeightToAssign(filter,input.lesson_id);
 const addExerciseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    lesson_id: Joi.string().required(),
    weight: Joi.number().max(maxWeight).required(),
    instruction: Joi.string().required(),
});
    return addExerciseSchema.validateAsync(input);
  };

const validateUpdateExerciseInput = async (input) => {
    const filter= exerciseMaxWeightUpdateFilter(input.exercise_id,input.lesson_id)
    const maxWeight = await getExerciseMaxWeightToAssign(filter,input.lesson_id);
    const updateExerciseSchema = Joi.object({
        exercise_id: Joi.any().required(),
        lesson_id: Joi.any().required(),
        title: Joi.string(),
        description: Joi.string(),
        weight: Joi.number().max(maxWeight),
        instruction: Joi.string(),
    });
 
    return updateExerciseSchema.validateAsync(input);
  };
module.exports={
    validateAddExerciseInput,
    validateUpdateExerciseInput
}