
const { WEIGHT } = require("../constant/common");
const Lesson = require("../models/lesson.model");
const { Op } = require("sequelize");
const Lesson_User = require("../models/lesson_user.model");
const insertLesson=async(param,t={})=>{
  const new_Lesson = new Lesson(param)
  const  result= await new_Lesson.save(t)
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

const fetchLessonUser=async(userId,lessonId)=>{
  const result =   await Lesson_User.findOne({where:{lessonId,userId}})
  return result;
  }



const getLessonMaxWeightToAssign=async(filter)=>{
  const result =  await Lesson.sum('weight',filter)
  return WEIGHT.MAX-result;
  }

const getNextLeastOrderLesson=async(course_id,order_value)=>{
  const leastOrderLesson = await Lesson.findOne({
  where: { 
    courseId: course_id,
    order: { [Op.gt]: order_value }
  },
  order: [['order', 'ASC']],
});
return leastOrderLesson
  }

  
module.exports={
insertLesson,
fetchLessons,
fetchLesson,
editLesson,
removeLesson,
getLessonMaxWeightToAssign,
getNextLeastOrderLesson,
fetchLessonUser
}