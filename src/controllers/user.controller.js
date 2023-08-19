const { handleError } = require("../helpers/handleError");
const Lesson = require("../models/lesson.model");
const { fetchCourse} = require("../service/course");
const { getCoursesWithProgress, getCoursesInfo } = require("../service/exercise");
const { fetchRole } = require("../service/role");
const { fetchUserById } = require("../service/user");
const { getByIdSchema } = require("../validation/common.validation");
const { roleToUserSchema, courseToUserSchema} = require("../validation/user.validation");
const sequelize=require('../util/database');
const Exercise = require("../models/exercise.model");
const Lesson_User = require("../models/lesson_user.model");
const Exercise_User = require("../models/exercise_user.model");
const { mapCourseUserInfo } = require("../helpers/common");

exports.addRoleToUser = async (req, res, next) => {
  try {
    const {id:user_id}= req.params
    const {role_id}= req.body
    const {error}=roleToUserSchema.validate({
      user_id,role_id
    })
    if(error){
      handleError(error.message,403)
    }
    
    const user=await fetchUserById(user_id)
    if(!user){
      handleError("user does not exist",403)
    }
    const existing_user_roles=await user.getRoles()
      if(existing_user_roles.find(e=>e.id===role_id))
     {
      handleError("This role already exist",403)
     }
     const role = await fetchRole({where:{id:role_id}})
     await user.addRole(role)
     return res.status(201).json({
       success:true,
       message:"role added successfully"
     })
    
  } catch (err) {
    next(err);
  }
};

exports.deleteRoleFromUser  = async (req, res, next) => {
  try {
    const {id:user_id,role_id}= req.params
    const {error}=roleToUserSchema.validate({
      user_id,role_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await fetchUserById(user_id)
    if(!user){
      handleError("user does not exist",403)
    }
    const existing_user_roles=await user.getRoles()
      if(existing_user_roles.find(e=>e.id===role_id))
     {
      const role = await fetchRole({where:{id:role_id}})
      await user.removeRole(role)
      return res.status(201).json({
        success:true,
        message:"role removed successfully"
      })
     }
     handleError("This role not exist for this user",403)
  } catch (err) {
    next(err);
  }
};

exports.registerUserForCourse = async (req, res, next) => {
  const t=await sequelize.transaction()
  try {
    const {id:user_id}= req.params
    const {course_id}= req.body
    const {error}=courseToUserSchema.validate({
      user_id,course_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await fetchUserById(user_id)
    if(!user){
      handleError("user does not exist",403)
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
     const [course_user]=await user.addCourse(course,{ transaction: t })
        const lesson_users=await user.addLessons(course?.lessons,
      {through: { courseUserId: course_user.id },transaction: t })
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

exports.getUserCoursesWithProgress = async (req, res, next) => {
  try {
    const {id}= req.params
    const {error}=getByIdSchema.validate({
      id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await fetchUserById(id)
    if(!user){
      handleError("user does not exist",403)
    }
    const user_courses=await getCoursesWithProgress({
      where: { userId:id }
    })
     return res.json(user_courses)

  } catch (err) {
    next(err);
  }
};

exports.getUserCoursesInfo = async (req, res, next) => {
  try {
    const {id}= req.params
    const {error}=getByIdSchema.validate({
      id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await fetchUserById(id)
    if(!user){
      handleError("user does not exist",403)
    }
    const user_courses=await getCoursesInfo({where: { userId:id }})
    return res.json(mapCourseUserInfo(user_courses))

  } catch (err) {
    console.log(err)
    next(err);
  }
};

exports.getUserCourseWithProgress = async (req, res, next) => {
  try {
    const {id:user_id,course_id}= req.params
    const {error}=courseToUserSchema.validate({
      user_id,course_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await fetchUserById(user_id)
    if(!user){
      handleError("user does not exist",403)
    }
    const [user_course]=await getCoursesWithProgress({
      where: { userId:user_id, courseId:course_id}
    })
     return res.json(user_course)
    
  } catch (err) {
    next(err);
  }
};


exports.getUserCourseInfo = async (req, res, next) => {
  try {
    const {id:user_id,course_id}= req.params
    const {error}=courseToUserSchema.validate({
      user_id,course_id
    })
    if(error){
      handleError(error.message,403)
    }
    const user=await fetchUserById(user_id)
    if(!user){
      handleError("user does not exist",403)
    }
    const user_courses=await getCoursesInfo({
      where: { userId:user_id, courseId:course_id}
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