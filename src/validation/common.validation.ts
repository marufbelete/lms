import Joi from 'joi';

export const getByIdSchema = Joi.object({
    id: Joi.string().required(),
});

