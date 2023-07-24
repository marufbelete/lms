const { insertExercise,fetchExercises,
editExercise,fetchExercise, removeExercise } = require("../service/exercise");
const { addExerciseSchema, updateExerciseSchema } = require("../validation/exercise.validation");
const { getByIdSchema } = require("../validation/common.validation");
const { handleError } = require("../helpers/handleError");
const Lesson = require("../models/lesson.model");
const { fetchLesson } = require("../service/lesson");

exports.addExercise=async(req,res,next)=>{
  try{
    const param= req.body;
    const {lesson_id}= req.params;
    const {error}=addExerciseSchema.validate({...param,lesson_id})
    if(error){
      handleError(error.message,403)
    }
    const exercise = await insertExercise(param);
    const lesson=await fetchLesson({where:{id:lesson_id}})
    if(!lesson){
      handleError("lesson does not exist",403)
    }
    await lesson.addExercise(exercise)
    return res.status(201).json({
      success:true,
      message:"exercise added"
    });
  }
  catch(error){
   next(error)
  }
}

exports.getExercises=async(req,res,next)=>{
  try{
    const {lesson}=req.query
    const {lesson_id}=req.params
    const filter={
      where:{
        lessonId:lesson_id
       }
    }
    if(lesson){
      filter.include={
        model:Lesson
      }
    }
    const result = await fetchExercises(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.updateExercise=async(req,res,next)=>{
  try{
    const {exercise_id}=req.params;
    const param=req.body;
    const {error}=updateExerciseSchema.validate({
      id:exercise_id,...param
    })
    if(error){
      handleError(error.message,403)
    }
    const filter={
      where:{
      id:exercise_id
      }
    };
    
    const result = await editExercise(param,filter);
    return res.status(201).json(result);
  }
  catch(error){
   next(error)
  }
}

exports.getExercise=async(req,res,next)=>{
  try{
    const {exercise_id}=req.params;
    const {lesson}=req.query
    const {error}=getByIdSchema.validate({id:exercise_id})
    if(error){
      handleError(error.message,403)
    }
    const filter={
      where:{id:exercise_id}
    }
    if(lesson){
      filter.include={
        model:Lesson
      }
    }
    const result = await fetchExercise(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}

exports.deleteExercise=async(req,res,next)=>{
  try{
    const {exercise_id}=req.params;
    const {error}=getByIdSchema.validate({id:exercise_id})
    if(error){
      handleError(error.message,403)
    }
    const filter = {
      where:{
        id:exercise_id
      }
    }
    const result = await removeExercise(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}