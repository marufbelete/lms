const express=require('express')
const route=express.Router({ mergeParams: true })
const {addCourse,getCourse,getCourses,
updateCourse, deleteCourse}=require('../controllers/course.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.post('/',addCourse,errorHandler)
route.get('/',getCourses,errorHandler)
route.put('/:id',updateCourse,errorHandler)
route.get('/:id',getCourse,errorHandler)
route.delete('/:id',deleteCourse,errorHandler)

module.exports=route