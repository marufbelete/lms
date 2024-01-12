"use strict";
// import { WEIGHT } from "../constant/common";
// import { Op } from "sequelize";
// import {Lesson,Lesson_User} from "../models/";
// const insertLesson=async(param,t={})=>{
//   const new_Lesson = new Lesson(param)
//   const  result= await new_Lesson.save(t)
//   return result;
// }
// const fetchLessons=async(filter)=>{
//   const result =  await Lesson.findAll(filter)
//   return result;
// }
// const fetchLesson=async(filter)=>{
//   const result =  await Lesson.findOne(filter)
//   return result;
// }
// const editLesson=async(param,filter)=>{
//   const result =  await Lesson.update(param,filter)
//   return result;
//   }
// const removeLesson=async(filter)=>{
//   const result =  await Lesson.destroy(filter)
//   return result;
//   }
// const fetchLessonUser=async(userId,lessonId)=>{
//   const result =   await Lesson_User.findOne({where:{lessonId,userId}})
//   return result;
//   }
// const getLessonMaxWeightToAssign=async(filter)=>{
//   const result =  await Lesson.sum('weight',filter)
//   return WEIGHT.MAX-result;
//   }
// const getNextLeastOrderLesson=async(course_id,order_value)=>{
//   const leastOrderLesson = await Lesson.findOne({
//   where: { 
//     courseId: course_id,
//     order: { [Op.gt]: order_value }
//   },
//   order: [['order', 'ASC']],
// });
// return leastOrderLesson
//   }
// export{
// insertLesson,
// fetchLessons,
// fetchLesson,
// editLesson,
// removeLesson,
// getLessonMaxWeightToAssign,
// getNextLeastOrderLesson,
// fetchLessonUser
// }
//# sourceMappingURL=lesson.js.map