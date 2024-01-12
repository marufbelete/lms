"use strict";
// const { handleError } = require("../helpers/handleError");
// const { getLoggedUser } = require("../helpers/user");
// const { fetchCourse, editCourseUser, coursePrerequisiteNotCompleted } = require("../service/course");
// const { editUser, fetchUserById } = require("../service/user");
// const { courseToLoggedUserSchema, updateUserSchema, lessonIdSchema } = require("../validation/user.validation");
// const sequelize=require('../util/database');
// const Exercise = require("../models/exercise.model");
// const Lesson_User = require("../models/lesson_user.model");
// const { getCoursesWithProgress, getCoursesInfo, fetchExercises } = require("../service/exercise");
// const { mapCourseUserInfo, mapUserExerciseInfo, mapCourseCompleted } = require("../helpers/common");
// const Lesson = require("../models/lesson.model");
// const Exercise_User = require("../models/exercise_user.model");
// const { fetchLessonUser, editLessonUser, fetchLesson } = require("../service/lesson");
// const StepValidation = require("../models/step_validation.model");
// const { removeImage, saveImage, getImage } = require("../helpers/file");
// exports.updateLoggedUserProfile = async (req, res, next) => {
//   try {
//     const {error}=updateUserSchema.validate(req.body)
//     if(error){
//       handleError(error.message,403)
//     }
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user not exist!",403)
//     }
//     const filter={
//       where:{
//         id:user.id
//       },
//       returning:true
//     }
//     const update_info={...req.body}
//     let profile_url=null
//     let key=user.avatar
//       if(req.file){
//         key = await saveImage(req,config.AWS_PROFILE_FOLDER)
//         user.avatar&& await removeImage(user.avatar)
//         update_info.avatar=key
//       }
//       if(key){
//         profile_url= await getImage(user.avatar)
//       }
//     const [,user_info]=await editUser(update_info,filter)
//     user_info[0].avatar=profile_url
//      return res.status(201).json({
//        success:true,
//        user_info:user_info[0],
//        message:"profile updated!"
//      })
//   } catch (err) {
//     next(err);
//   }
// };
// exports.getLoggedUserProfile = async (req, res, next) => {
//   try {
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user not exist!",403)
//     }
//     const user_info=await fetchUserById(user.id)
//      return res.status(201).json(user_info)
//   } catch (err) {
//     next(err);
//   }
// };
// exports.registerLoggedUserForCourse = async (req, res, next) => {
//   try {
//     await sequelize.transaction(async (t) => {
//     const {course_id}= req.body
//     const {error}=courseToLoggedUserSchema.validate({
//       course_id
//     })
//     if(error){
//       handleError(error.message,403)
//     }
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user not exist",403)
//     }
//     const existing_user_courses=await user.getCourses()
//     if(existing_user_courses.find(e=>e.id===course_id)){
//     handleError("This user already registerd for the course",403)
//    }
//    const course = await fetchCourse({where:{id:course_id},
//   include:[
//     {
//       model:Lesson,
//       include: [
//         {
//           model: Lesson_User
//         },
//         {
//           model: Exercise
//         },
//       ],
//     }
//   ]})
//    if(!course){
//     handleError("Course not exist",403)
//    }
//   //  const leastOrderLesson = await fetchLesson({
//   //   where: { courseId: course_id },
//   //   order:[
//   //     ['order','ASC'],
//   //     ['createdAt','ASC']
//   //   ]
//   //   });
// //may remove this  currentLessonId: leastOrderLesson.id
//     const [course_user]=await user.addCourse(course,{ transaction: t })
//     console.log(course_user)
//     const lesson_users=await user.addLessons(course?.lessons,
//     {through: { courseUserId: course_user.id },transaction: t })
//     //may goes to start api
//     // await editLessonUser(
//     //   { is_started: true },
//     //   { where: { lessonId: leastOrderLesson.id, userId: user.id },transaction: t }
//     // );
//    for(let lesson of course?.lessons||[]){
//     let lesson_user=lesson_users.find(e=>e.lessonId===lesson.id)
//     await user.addExercises(lesson?.exercises,
//     { through: { lessonUserId:lesson_user.id },transaction: t })
//   }
//   })
//   return res.status(201).json({
//     success:true,
//     message:"You are registerd for the course successfully"
//   })
// } catch (err) {
//   next(err);
// }
// };
// exports.startCourse = async (req, res, next) => {
//   try {
//     const result= await sequelize.transaction(async (t) => {
//       const {course_id,force}= req.body
//       const user=await getLoggedUser(req)
//       if(!user){
//         handleError("user does not exist",403)
//       }
//       if(!force){
//         const {prereq}= await coursePrerequisiteNotCompleted(course_id,user.id)
//         if(prereq.length>0){
//           return({prereq:mapCourseCompleted(prereq),status:false})
//         } 
//       }
//       const leastOrderLesson = await fetchLesson({
//         where: { courseId: course_id },
//         order:[
//           ['order','ASC'],
//           ['createdAt','ASC']
//         ]
//         });
//         await editCourseUser({
//         currentLessonId: leastOrderLesson.id,is_started:true},
//         {where: { userId:user.id,courseId:course_id }})
//         await editLessonUser(
//         { is_started: true },
//         { where: { lessonId: leastOrderLesson.id,
//         userId: user.id },transaction: t });
//         return {status:true}
//   })
//     return res.json(result)
//   } catch (err) {
//     next(err);
//   }
// };
// exports.getLoggedUserCoursesWithProgress = async (req, res, next) => {
//   try {
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user not exist",403)
//     }
//     const user_courses=await getCoursesWithProgress({
//       where: { userId:user.id }
//     })
//      return res.json(user_courses)
//   } catch (err) {
//     next(err);
//   }
// };
// exports.getUserCoursesInfo = async (req, res, next) => {
//   try {
//    const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user does not exist",403)
//     }
//     const user_courses=await getCoursesInfo({where: { userId:user.id },order:[
//       [Lesson_User,Lesson,'order','ASC'],
//       [Lesson_User,Lesson,'createdAt','ASC'],
//       [Lesson_User,Exercise_User,Exercise,'order','ASC'],
//       [Lesson_User,Exercise_User,Exercise,'createdAt','ASC']
//     ]})
//     return res.json(mapCourseUserInfo(user_courses))
//   } catch (err) {
//     next(err);
//   }
// };
// exports.getLoggedUserCourseWithProgress = async (req, res, next) => {
//   try {
//     const {course_id}= req.params
//     const {error}=courseToLoggedUserSchema.validate({
//       course_id
//     })
//     if(error){
//       handleError(error.message,403)
//     }
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user not exist",403)
//     }
//     const [user_course]=await getCoursesWithProgress({
//       where: { userId:user.id, courseId:course_id}
//     })
//     if(!user_course){
//       handleError("course not found",404)
//     }
//     return res.json(user_course)
//   } catch (err) {
//     next(err);
//   }
// };
// exports.getUserCourseInfo = async (req, res, next) => {
//   try {
//     const {course_id}= req.params
//     const {error}=courseToLoggedUserSchema.validate({
//       course_id
//     })
//     if(error){
//       handleError(error.message,403)
//     }
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("user does not exist",403)
//     }
//     const user_courses=await getCoursesInfo({
//       where: { userId:user.id, courseId:course_id},order:[
//         [Lesson_User,Lesson,'order','ASC'],
//         [Lesson_User,Lesson,'createdAt','ASC'],
//         [Lesson_User,Exercise_User,Exercise,'order','ASC'],
//         [Lesson_User,Exercise_User,Exercise,'createdAt','ASC']
//       ]
//     })
//     if(user_courses.length<1){
//       handleError("course not found")
//     }
//     const [user_course]=mapCourseUserInfo(user_courses)
//     return res.json(user_course)
//   } catch (err) {
//     next(err);
//   }
// };
// exports.getUserExerciseInfo = async (req, res, next) => {
//   try {
//     const {lesson_id}= req.params
//     const {error}=lessonIdSchema.validate({
//       lesson_id
//     })
//     if(error){
//       handleError(error.message,403)
//     }
//     const user=await getLoggedUser(req)
//     if(!user){
//       handleError("User does not exist",403)
//     }
//     const lesson_user= await fetchLessonUser(user.id,lesson_id)
//     if(!lesson_user){
//       handleError("The given lesson not found",403)
//     }
//     const exercises_info=await fetchExercises({
//       order:[
//         ['order','ASC'],
//         ['createdAt','ASC'],
//       ],
//       include:[{
//         model:Exercise_User,
//         where:{
//           userId:user.id,
//           lessonUserId:lesson_user.id
//         }
//       },{
//         model:StepValidation,
//         attributes:['type']
//       }]
//     })
//     const maped_data=mapUserExerciseInfo(exercises_info)
//     return res.status(200).json(maped_data)
//   } catch (err) {
//     next(err);
//   }
// };
//# sourceMappingURL=logged_user.controller.js.map