const Joi = require('joi');

 const addExerciseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    lesson_id: Joi.string().required(),
    weight: Joi.number().required(),
    instruction: Joi.string().required(),
});

 const updateExerciseSchema = Joi.object({
    id: Joi.any().required(),
    title: Joi.string(),
    description: Joi.string(),
    weight: Joi.number(),
    instruction: Joi.string(),
});

module.exports={
    addExerciseSchema,
    updateExerciseSchema
}