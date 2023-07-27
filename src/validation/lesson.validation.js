const Joi = require('joi');

 const addLessonSchema = Joi.object({
    description: Joi.string().required(),
    course_id: Joi.string().required(),
    weight: Joi.number().required(),
});

 const updateLessonSchema = Joi.object({
    lesson_id: Joi.any().required(),
    description: Joi.string(),
    weight: Joi.number(),
});

module.exports={
    addLessonSchema,
    updateLessonSchema
}