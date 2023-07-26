const { handleError } = require("../helpers/handleError");
const { getLoggedUser } = require("../helpers/user");
const { fetchCourse } = require("../service/course");
const { editUser } = require("../service/user");
const { courseToLoggedUserSchema, updateUserSchema } = require("../validation/user.validation");


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
      if(existing_user_courses.find(e=>e.id===course_id))
     {
      return res.json({
      message:"This user already registerd for the course",
      success:true
      })
     }
     const course = await fetchCourse({where:{id:course_id}})
     await user.addCourse(course,{through:{progress:0}})
     return res.status(201).json({
       success:true,
       message:"You are registerd for the course successfully"
     })
    
  } catch (err) {
    next(err);
  }
};

exports.getLoggedUserCoursesWithProgress = async (req, res, next) => {
  try {
    const user=await getLoggedUser(req)
    if(!user){
      handleError("user not exist",403)
    }
    const user_courses=await user.getCourses({
      joinTableAttributes:['id','progress']
    })

     return res.json({
         user_courses
     })

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
    const user_courses=await user.getCourses({
      where:{
        id:course_id
      },
      joinTableAttributes:['id','progress','createdAt','updatedAt']
    })
     return res.json({
         user_courses
     })
    
  } catch (err) {
    next(err);
  }
};






