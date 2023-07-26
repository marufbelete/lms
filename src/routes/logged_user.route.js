const express=require('express')
const route=express.Router({ mergeParams: true })
const {getLoggedUserCourseWithProgress,
getLoggedUserCoursesWithProgress,
registerLoggedUserForCourse,
updateLoggedUserProfile}=require('../controllers/logged_user.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')
const { authenticateJWT } = require('../middleware/auth.middleware')


route.put('/course',authenticateJWT,registerLoggedUserForCourse,errorHandler)
route.get('/course',authenticateJWT,getLoggedUserCoursesWithProgress,errorHandler)
route.get('/course/:course_id',authenticateJWT,getLoggedUserCourseWithProgress,errorHandler)
route.put('/profile',authenticateJWT,updateLoggedUserProfile,errorHandler)

module.exports=route