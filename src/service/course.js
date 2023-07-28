
const Course = require("../models/course.model");
const Course_User = require("../models/course_user.model");

const insertCourse=async(param)=>{
  const new_course = new Course(param)
  const  result= await new_course.save()
  return result;
}

const fetchCourses=async(filter)=>{
  const result =  await Course.findAll(filter)
  return result;
}

const fetchCourse=async(filter)=>{
  const result =  await Course.findOne(filter)
  return result;
}

const fetchCourse_User=async(filter)=>{
  const result =  await Course_User.findOne(filter)
  return result;
}

const editCourse=async(param,filter)=>{
  const result =  await Course.update(param,filter)
  return result;
  }

const removeCourse=async(filter)=>{
  const result =  await Course.destroy(filter)
  return result;
  }
  
module.exports={
insertCourse,
fetchCourses,
fetchCourse,
editCourse,
removeCourse,
fetchCourse_User
}