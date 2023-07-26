const { handleError } = require("../helpers/handleError");
const { fetchCourse } = require("../service/course");
const { getCoursesWithProgress } = require("../service/exercise");
const { fetchRole } = require("../service/role");
const { fetchUserById } = require("../service/user");
const { getByIdSchema } = require("../validation/common.validation");
const { roleToUserSchema, courseToUserSchema} = require("../validation/user.validation");

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
      return res.json({
      message:"This role already exist",
      success:true
      })
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
     return res.json({
      message:"This role not exist for this user",
      success:true
    })
  } catch (err) {
    next(err);
  }
};

exports.registerUserForCourse = async (req, res, next) => {
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
    // const user_courses=await user.getCourses({
    //   joinTableAttributes:['id','progress']
    // })
    const user_courses=await getCoursesWithProgress(id)

     return res.json({
      user_courses
     })

  } catch (err) {
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
