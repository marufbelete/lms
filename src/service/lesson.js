
const { WEIGHT } = require("../constant/common");
const Lesson = require("../models/lesson.model");
const insertLesson=async(param)=>{
  const new_Lesson = new Lesson(param)
  const  result= await new_Lesson.save()
  return result;
}

const fetchLessons=async(filter)=>{
  const result =  await Lesson.findAll(filter)
  return result;
}

const fetchLesson=async(filter)=>{
  const result =  await Lesson.findOne(filter)
  return result;
}

const editLesson=async(param,filter)=>{
  const result =  await Lesson.update(param,filter)
  return result;
  }

const removeLesson=async(filter)=>{
  const result =  await Lesson.destroy(filter)
  return result;
  }

const getLessonMaxWeightToAssign=async(filter)=>{
  const result =  await Lesson.sum('weight',filter)
  return WEIGHT.MAX-result;
  }


  
module.exports={
insertLesson,
fetchLessons,
fetchLesson,
editLesson,
removeLesson,
getLessonMaxWeightToAssign
}