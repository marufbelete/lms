const express=require('express')
const route=express.Router()
const role_route = require('./role.route');
const auth_route = require('./auth.route');
const user_route = require('./user.route');
const logged_user_route = require('./logged_user.route');
const course_route = require('./course.route');
const lesson_route = require('./lesson.route');
const exercise_route = require('./exercise.route');

const PATH={
    AUTH:'/auth',
    ROLE:'/role',
    USER:'/user/:id',
    LOGGED_USER:'/user',
    COURSE:'/course',
}

route.use(PATH.ROLE,role_route)
route.use(PATH.AUTH,auth_route)
route.use(PATH.USER,user_route)
route.use(PATH.LOGGED_USER,logged_user_route)
route.use(PATH.COURSE,course_route)
route.use(lesson_route)
route.use(exercise_route)

module.exports=route