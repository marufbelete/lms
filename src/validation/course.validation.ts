import Joi from 'joi';

export const addCourseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    estimatedTime: Joi.string(),
    difficulty: Joi.string(),
    collectionId: Joi.string(),
    prerequisiteIds:Joi.array()
});

export const updateCourseSchema = Joi.object({
    id: Joi.any().required(),
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    estimatedTime: Joi.string(),
    difficulty: Joi.string(),
    collectionId: Joi.string(),
    prerequisiteIds:Joi.array()
});
