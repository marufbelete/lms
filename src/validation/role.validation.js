const Joi = require('joi');

 const addRoleSchema = Joi.object({
    name: Joi.string().required(),
});

 const updateRoleSchema = Joi.object({
    id: Joi.any().required(),
    name: Joi.string().required()
});

module.exports={
    addRoleSchema,
    updateRoleSchema
}