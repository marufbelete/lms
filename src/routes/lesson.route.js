const express=require('express')
const route=express.Router({ mergeParams: true })
const {addLesson,getLessons,updateLesson,
getLesson,deleteLesson}=require('../controllers/lesson.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')
const PATH={
    COURSE_LS:'/course/:course_id/lesson',
    LESSON:'/lesson/:lesson_id'
}
route.post(PATH.COURSE_LS,addLesson,errorHandler)
route.get(PATH.COURSE_LS,getLessons,errorHandler)
route.put(PATH.LESSON,updateLesson,errorHandler)
route.get(PATH.LESSON,getLesson,errorHandler)
route.delete(PATH.LESSON,deleteLesson,errorHandler)

module.exports=route