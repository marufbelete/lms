const { insertLesson,fetchLessons,
editLesson,fetchLesson, removeLesson } = require("../service/lesson");
const { addLessonSchema,updateLessonSchema, validateAddLessonInput, validateUpdateLessonInput} = require("../validation/lesson.validation");
const { getByIdSchema } = require("../validation/common.validation");
const { handleError } = require("../helpers/handleError");
const { fetchCourse } = require("../service/course");
const Course = require("../models/course.model");
const Exercise = require("../models/exercise.model");

exports.addLesson=async(req,res,next)=>{
  try{
    const param= req.body;
    const {course_id} =req.params;
    const {error}=await validateAddLessonInput({...param,course_id})
    if(error){
      handleError(error.message,403)
    }
    const lesson = await insertLesson(param);
    const course=await fetchCourse({where:{id:course_id}})
    if(!course){
      handleError("course does not exist",403)
    }
    await course.addLesson(lesson)
    return res.status(201).json({
      success:true,
      message:"lesson added"
    });
  }
  catch(error){
   next(error)
  }
}

exports.getLessons=async(req,res,next)=>{
  try{
    const {course,exercise}=req.query
    const {course_id}=req.params
    const filter={
      where:{
       courseId:course_id
      },
      include:[]
    }
    if (course) {
      filter.include.push({
          model: Course,
        })
    if (exercise) {
      filter.include.push({
          model: Exercise,
        })
      }
    }
    const result = await fetchLessons(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.updateLesson=async(req,res,next)=>{
  try{
    const {lesson_id,course_id}=req.params;
    const param=req.body;
    const filter={
      where:{
      id:lesson_id
      }
    };
    const {error}=await validateUpdateLessonInput({
      course_id,lesson_id,...param
    })
    if(error){
      handleError(error.message,403)
    }
    const result = await editLesson(param,filter);
    return res.status(201).json(result);
  }
  catch(error){
   next(error)
  }
}

exports.getLesson=async(req,res,next)=>{
  try{
    const {lesson_id}=req.params;
    const {course,exercise}=req.query;
    const {error}=getByIdSchema.validate({id:lesson_id})
    if(error){
      handleError(error.message,403)
    }
    const filter={
      where:{id:lesson_id}
    }
    if (course || exercise) {
      filter.include = [
        {
          model: Course,
          required: course
        },
        {
          model: Exercise,
          required: exercise
        }
      ];
    }
    const result = await fetchLesson(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.deleteLesson=async(req,res,next)=>{
  try{
    const {lesson_id}=req.params;
    const {error}=getByIdSchema.validate({id:lesson_id})
    if(error){
      handleError(error.message,403)
    }
    const filter = {
      where:{
        id:lesson_id
      }
    }
    const result = await removeLesson(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}