const Joi = require('joi');
const { getLessonMaxWeightToAssign } = require('../service/lesson');
const { lessonMaxWeightFilter, lessonMaxWeightUpdateFilter, } = require('../helpers/common');


const validateAddLessonInput = async (input) => {
    const filter= lessonMaxWeightFilter(input.course_id)
    const maxWeight = await getLessonMaxWeightToAssign(filter);
    const addLessonSchema = Joi.object({
        description: Joi.string().required(),
        course_id: Joi.string().required(),
        title: Joi.string().required(),
        weight: Joi.number().max(maxWeight).required(),
    });
    return addLessonSchema.validateAsync(input);
  };

const validateUpdateLessonInput = async (input) => {
    const filter= lessonMaxWeightUpdateFilter(input.course_id,input.lesson_id)
    const maxWeight = await getLessonMaxWeightToAssign(filter);
    const updateLessonSchema = Joi.object({
        lesson_id: Joi.any().required(),
        description: Joi.string(),
        title: Joi.string(),
        course_id: Joi.string().required(),
        weight: Joi.number().max(maxWeight),
    });
    return updateLessonSchema.validateAsync(input);
  };



module.exports={
    validateAddLessonInput,
    validateUpdateLessonInput
}




