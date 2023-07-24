const express=require('express')
const route=express.Router()
const role_route = require('./role.route');
const auth_route = require('./auth.route');
const user_route = require('./user.route');
const course_route = require('./course.route');
const lesson_route = require('./lesson.route');
const exercise_route = require('./exercise.route');

const PATH={
    AUTH:'/auth',
    ROLE:'/role',
    USER:'/user/:id',
    COURSE:'/course',
    COURSE_LESSON:'/course/:course_id/lesson',
    LESSON_EXERCISE:'/lesson/:lesson_id/exercise'
}

route.use(PATH.ROLE,role_route)
route.use(PATH.AUTH,auth_route)
route.use(PATH.USER,user_route)
route.use(PATH.COURSE,course_route)
route.use(PATH.COURSE_LESSON,lesson_route)
route.use(PATH.LESSON_EXERCISE,exercise_route)

module.exports=route