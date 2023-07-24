const Joi = require('joi');

 const getByIdSchema = Joi.object({
    id: Joi.string().required(),
});


module.exports={
    getByIdSchema
}