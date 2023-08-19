const { insertCourse,fetchCourses,
editCourse,fetchCourse, removeCourse } = require("../service/course");
const { addCourseSchema, updateCourseSchema } = require("../validation/course.validation");
const { getByIdSchema } = require("../validation/common.validation");
const { handleError } = require("../helpers/handleError");
const Lesson = require("../models/lesson.model");
const Exercise = require("../models/exercise.model");

exports.addCourse=async(req,res,next)=>{
  try{
    const param= req.body;
    const {error}=addCourseSchema.validate(param)
    if(error){
      handleError(error.message,403)
    }
    const result = await insertCourse(param);
    return res.status(201).json(result);
  }
  catch(error){
   next(error)
  }
}

exports.getCourses=async(req,res,next)=>{
  try{
    const {lesson}=req.query
    const filter={}
    if(lesson){
      filter.include={
        model:Lesson
      }
    }
    const result = await fetchCourses(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.getCoursesInfo=async(req,res,next)=>{
  try{
    const filter={
      attributes:['id','title','description'],
      include:[{
        model:Lesson,
        attributes:['id','title'],
        include:{
          model:Exercise,
          attributes:['id','title'],
        }
      }]
    }
    const result = await fetchCourses(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.updateCourse=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const param=req.body;
    const filter={
      where:{
      id
      }
    };
    const {error}=updateCourseSchema.validate({
      id,...param
    })
    if(error){
      handleError(error.message,403)
    }
    const result = await editCourse(param,filter);
    return res.status(201).json(result);
  }
  catch(error){
   next(error)
  }
}

exports.getCourse=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const {lesson}=req.query
    const {error}=getByIdSchema.validate({id})
    if(error){
      handleError(error.message,403)
    }
    const filter={
      where:{id}
    }
    if(lesson){
      filter.include={
        model:Lesson
      }
    }
    const result = await fetchCourse(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.getCourseInfo=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const {error}=getByIdSchema.validate({id})
    if(error){
      handleError(error.message,403)
    }
    const filter={
      where:{id},
      attributes:['id','title','description'],
      include:[{
        model:Lesson,
        attributes:['id','title'],
        include:{
          model:Exercise,
          attributes:['id','title'],
        }
      }]
    }
    const result = await fetchCourse(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.deleteCourse=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const {error}=getByIdSchema.validate({id})
    if(error){
      handleError(error.message,403)
    }
    const filter = {
      where:{
        id
      }
    }
    const result = await removeCourse(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}