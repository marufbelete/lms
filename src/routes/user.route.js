const express=require('express')
const route=express.Router({ mergeParams: true })
const {addRoleToUser,deleteRoleFromUser,
registerUserForCourse,getUserCourseWithProgress,
getUserCoursesWithProgress}=require('../controllers/user.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.put('/role',addRoleToUser,errorHandler)
route.delete('/role/:role_id',deleteRoleFromUser,errorHandler)
route.put('/course',registerUserForCourse,errorHandler)
route.get('/course',getUserCoursesWithProgress,errorHandler)
route.get('/course/:course_id',getUserCourseWithProgress,errorHandler)


module.exports=route