const { handleError } = require("../helpers/handleError");
const { getLoggedUser } = require("../helpers/user");
const { fetchCourse } = require("../service/course");
const { editUser } = require("../service/user");
const { courseToLoggedUserSchema, updateUserSchema } = require("../validation/user.validation");
const sequelize=require('../util/database');
const Exercise = require("../models/exercise.model");
const Lesson_User = require("../models/lesson_user.model");
const { getCoursesWithProgress, getCoursesInfo } = require("../service/exercise");
const { mapCourseUserInfo } = require("../helpers/common");
const Lesson = require("../models/lesson.model");

exports.updateLoggedUserProfile = async (req, res, next) => {
  try {
    const {error}=updateUserSchema.validate(req.body)
    if(error){
      handleError(error.message,403)
    }
    const user=await getLoggedUser(req)
    if(!user){
      handleError("user not exist!",403)
    }
    const filter={
      where:{
        id:user.id
      },
      returning:true
    }
    user_info=await editUser(req.body,filter)
     return res.status(201).json({
       success:true,
       user_info,
       message:"profile updated!"
     })
    
  } catch (err) {
    next(err);
  }
};


exports.registerLoggedUserForCourse = async (req, res, next) => {
  const t=await sequelize.transaction()
  try {
    const {course_id}= req.body
    const {error}=courseToLoggedUserSchema.validate({
      course_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await getLoggedUser(req)
    if(!user){
      handleError("user not exist",403)
    }
    const existing_user_courses=await user.getCourses()
    if(existing_user_courses.find(e=>e.id===course_id)){
    handleError("This user already registerd for the course",403)
   }
   const course = await fetchCourse({where:{id:course_id},
  include:[
    {
      model:Lesson,
      include: [
        {
          model: Lesson_User,
        },
        {
          model: Exercise,
        },
      ],
    }
  ]})
   if(!course){
    handleError("Course not exist",403)
   }

   const leastOrderLesson = await Lesson.findOne({
    where: { courseId: course_id },
    order: [['order', 'ASC']],
  });

    const [course_user]=await user.addCourse(course,{through: { currentLessonId: leastOrderLesson.id }, transaction: t })
    const lesson_users=await user.addLessons(course?.lessons,
    {through: { courseUserId: course_user.id },transaction: t })

    await Lesson_User.update(
      { is_started: true },
      { where: { lessonId: leastOrderLesson.id, userId: user.id },transaction: t }
    );

   for(let lesson of course?.lessons){
    let lesson_user=lesson_users.find(e=>e.lessonId===lesson.id)
    await user.addExercises(lesson?.exercises,
    { through: { lessonUserId:lesson_user.id },transaction: t })
  }
   await t.commit()
   return res.status(201).json({
     success:true,
     message:"You are registerd for the course successfully"
   })
} catch (err) {
  await t.rollback()
  next(err);
}
};

exports.getLoggedUserCoursesWithProgress = async (req, res, next) => {
  try {
    const user=await getLoggedUser(req)
    if(!user){
      handleError("user not exist",403)
    }
    const user_courses=await getCoursesWithProgress({
      where: { userId:user.id }
    })
     return res.json(user_courses)

  } catch (err) {
    next(err);
  }
};

exports.getUserCoursesInfo = async (req, res, next) => {
  try {
   const user=await getLoggedUser(req)
    if(!user){
      handleError("user does not exist",403)
    }
    const user_courses=await getCoursesInfo({where: { userId:user.id }})
    return res.json(mapCourseUserInfo(user_courses))

  } catch (err) {
    next(err);
  }
};

exports.getLoggedUserCourseWithProgress = async (req, res, next) => {
  try {
    const {course_id}= req.params
    const {error}=courseToLoggedUserSchema.validate({
      course_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await getLoggedUser(req)
    if(!user){
      handleError("user not exist",403)
    }
    const [user_course]=await getCoursesWithProgress({
      where: { userId:user.id, courseId:course_id}
    })
    if(!user_course){
      handleError("course not found",404)
    }
    return res.json(user_course)
  } catch (err) {
    next(err);
  }
};

exports.getUserCourseInfo = async (req, res, next) => {
  try {
    const {course_id}= req.params
    const {error}=courseToLoggedUserSchema.validate({
      course_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await getLoggedUser(req)
    if(!user){
      handleError("user does not exist",403)
    }
    const user_courses=await getCoursesInfo({
      where: { userId:user.id, courseId:course_id}
    })
    if(user_courses.length<1){
      handleError("course not found")
    }
    const [user_course]=mapCourseUserInfo(user_courses)
    return res.json(user_course)

  } catch (err) {
    next(err);
  }
};




