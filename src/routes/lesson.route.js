const express=require('express')
const route=express.Router({ mergeParams: true })
const {addLesson,getLessons,updateLesson,
getLesson,deleteLesson}=require('../controllers/lesson.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.post('/',addLesson,errorHandler)
route.get('/',getLessons,errorHandler)
route.put('/:lesson_id',updateLesson,errorHandler)
route.get('/:lesson_id',getLesson,errorHandler)
route.delete('/:lesson_id',deleteLesson,errorHandler)

module.exports=route