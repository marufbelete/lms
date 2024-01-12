import Joi from 'joi';
import { LessonService } from '../service/index.service';
import { lessonMaxWeightFilter, lessonMaxWeightUpdateFilter, } from '../helpers/common';


export const validateAddLessonInput = async (input:any) => {
    const filter= lessonMaxWeightFilter(input.course_id)
    const maxWeight = await LessonService.getLessonMaxWeightToAssign(filter);
    const addLessonSchema = Joi.object({
        description: Joi.string().required(),
        course_id: Joi.string().required(),
        title: Joi.string().required(),
        weight: Joi.number().max(maxWeight).required(),
    });
    return addLessonSchema.validateAsync(input);
  };

export const validateUpdateLessonInput = async (input:any) => {
    const filter= lessonMaxWeightUpdateFilter(input.course_id,input.lesson_id)
    const maxWeight = await LessonService.getLessonMaxWeightToAssign(filter);
    const updateLessonSchema = Joi.object({
        lesson_id: Joi.any().required(),
        description: Joi.string(),
        title: Joi.string(),
        course_id: Joi.string().required(),
        weight: Joi.number().max(maxWeight),
    });
    return updateLessonSchema.validateAsync(input);
  };






