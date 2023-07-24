const Joi = require('joi');

 const signupUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    subscribed_to_newsletter: Joi.string(),
    avatar: Joi.string(),
    password: Joi.string().min(8).required(),
    role_id: Joi.string()
});

 const loginUserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.required()

});
 const roleToUserSchema = Joi.object({
    user_id: Joi.string().required(),
    role_id: Joi.string().required()

});
 const courseToUserSchema = Joi.object({
    user_id: Joi.string().required(),
    course_id: Joi.string().required()

});

module.exports={
    signupUserSchema,
    loginUserSchema,
    roleToUserSchema,
    courseToUserSchema
}