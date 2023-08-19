const express=require('express')
const route=express.Router({ mergeParams: true })
const {addRoleToUser,deleteRoleFromUser,getUserCourseInfo,
registerUserForCourse,getUserCourseWithProgress,
getUserCoursesWithProgress,getUserCoursesInfo}=require('../controllers/user.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.put('/role',addRoleToUser,errorHandler)
route.delete('/role/:role_id',deleteRoleFromUser,errorHandler)
route.put('/course',registerUserForCourse,errorHandler)
route.get('/course',getUserCoursesWithProgress,errorHandler)
route.get('/course/info',getUserCoursesInfo,errorHandler)
route.get('/course/:course_id',getUserCourseWithProgress,errorHandler)
route.get('/course/:course_id/info',getUserCourseInfo,errorHandler)

module.exports=route