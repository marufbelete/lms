"use strict";
// import {Course,Course_User,Exercise,
// Exercise_User ,Lesson,Lesson_User,Test} from "../models/";
// const insertExercise=async(param,t={})=>{
//   const new_Exercise = new Exercise(param)
//   const  result= await new_Exercise.save(t)
//   return result;
// }
// const fetchExercises=async(filter)=>{
//   const result =  await Exercise.findAll(filter)
//   return result;
// }
// const fetchTests=async(filter)=>{
//   const result =  await Test.findAll(filter)
//   return result;
// }
// const fetchExercise=async(filter)=>{
//   const result =  await Exercise.findOne(filter)
//   return result;
// }
// const fetchTest=async(filter)=>{
//   const result =  await Test.findOne(filter)
//   return result;
// }
// const inserTest=async(param,t={})=>{
//   const new_test = new Test(param)
//   const  result= await new_test.save(t)
//   return result;
// }
// const fetchExerciseUser=async(filter)=>{
//   const result =  await Exercise_User.findOne(filter)
//   return result;
// }
// const fetchExerciseUsers=async(filter)=>{
//   const result =  await Exercise_User.findAll(filter)
//   return result;
// }
// const editExercise=async(param,filter,t={})=>{
//   const result =  await Exercise.update(param,filter,...t)
//   return result;
//   }
// const removeExercise=async(filter)=>{
//   const result =  await Exercise.destroy(filter)
//   return result;
//   }
// const completeExercise=async(user_id,exercise_id,t={})=>{
//   const param={is_completed:true}
//   const filter={
//     where:{
//       userId:user_id,
//       exerciseId:exercise_id
//     },
//     ...t
//   }
//   const result =  await Exercise_User.update(param,filter)
//   return result;
//   }
// const getCoursesInfo = async (filter) => {
//   console.log('course_info',filter)
//   console.log(await Course_User.findAll())
//   const course_info = await Course_User.findAll({
//       ...filter,
//       attributes: ['currentLessonId'],
//       include: [
//         {
//           model: Course,
//           attributes: ['id','title','description'],
//         },
//         {
//           model: Lesson_User,
//           attributes: ['is_started'],
//           include: [
//             {
//               model: Lesson,
//               attributes: ['id','title']
//             },
//             {
//               model: Exercise_User,
//               attributes: ['is_completed'],
//               include: {
//                 model: Exercise,
//                 attributes: ['id','title'],
//               }
//             }
//         ],
//         },
//       ]  
//     });
//     console.log(course_info)
//     return course_info;
// };
// export{
// insertExercise,
// fetchExercises,
// fetchExercise,
// editExercise,
// removeExercise,
// completeExercise,
// // getCoursesWithProgress,
// getCoursesInfo,
// fetchExerciseUser,
// fetchExerciseUsers,
// fetchTests,
// fetchTest,
// inserTest
// }
//# sourceMappingURL=exercise.js.map