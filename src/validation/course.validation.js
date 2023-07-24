const Joi = require('joi');

 const addCourseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
});

 const updateCourseSchema = Joi.object({
    id: Joi.any().required(),
    title: Joi.string(),
    description: Joi.string(),
});

module.exports={
    addCourseSchema,
    updateCourseSchema
}