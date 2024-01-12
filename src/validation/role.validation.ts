import Joi from 'joi';

export const addRoleSchema = Joi.object({
    name: Joi.string().required(),
});

export const updateRoleSchema = Joi.object({
    id: Joi.any().required(),
    name: Joi.string().required()
});
