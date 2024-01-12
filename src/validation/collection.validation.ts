import Joi from 'joi';

export const addCollectionSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.any()
});

export const updateCollectionSchema = Joi.object({
    id: Joi.any().required(),
    title: Joi.string().required(),
    description: Joi.any()
});
