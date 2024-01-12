import Joi from 'joi';

export const signupUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().required().email(),
    username: Joi.string(),
    subscribed_to_newsletter: Joi.string(),
    avatar: Joi.string(),
    password: Joi.string().min(8).required(),
    role_id: Joi.string(),
  });
  
export const updateUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    avatar: Joi.string(),
    email: Joi.string().email(),
    username: Joi.string(),
    subscribed_to_newsletter: Joi.string()
  });
  
export const loginUserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.required(),
  });
export const roleToUserSchema = Joi.object({
    user_id: Joi.string().required(),
    role_id: Joi.string().required(),
  });
export const courseToUserSchema = Joi.object({
    user_id: Joi.string().required(),
    course_id: Joi.string().required(),
  });
export const lessonIdSchema = Joi.object({
    lesson_id: Joi.string().required(),
  });
export const courseToLoggedUserSchema = Joi.object({
    course_id: Joi.string().required(),
  });
export const changePasswordSchema = Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
  });
  
