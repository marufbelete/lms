const Joi = require('joi');

 const signupUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    subscribed_to_newsletter: Joi.string(),
    avatar: Joi.string(),
    password: Joi.required()
});

 const loginUserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.required()

});

module.exports={
    signupUserSchema,
    loginUserSchema
}