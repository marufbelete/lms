"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const route = express.Router({ mergeParams: true });
const { getLoggedUserCourseWithProgress, getLoggedUserCoursesWithProgress, getUserCoursesInfo, registerLoggedUserForCourse, getUserCourseInfo, getUserExerciseInfo, updateLoggedUserProfile } = require('../controllers/logged_user.controller');
const { errorHandler } = require('../middleware/errohandling.middleware');
const { authenticateJWT } = require('../middleware/auth.middleware');
const { completeExercise } = require('../controllers/exercise.controller');
route.put('/course', authenticateJWT, registerLoggedUserForCourse, errorHandler);
route.get('/course', authenticateJWT, getLoggedUserCoursesWithProgress, errorHandler);
route.get('/course/info', authenticateJWT, getUserCoursesInfo, errorHandler);
route.get('/course/:course_id', authenticateJWT, getLoggedUserCourseWithProgress, errorHandler);
route.get('/course/:course_id/info', authenticateJWT, getUserCourseInfo, errorHandler);
route.get('/lesson/:lesson_id/exercise', authenticateJWT, getUserExerciseInfo, errorHandler);
route.put('/exercise/:exercise_id/validate', authenticateJWT, completeExercise, errorHandler);
route.put('/profile', authenticateJWT, updateLoggedUserProfile, errorHandler);
exports.default = route;
//# sourceMappingURL=logged_user.route.js.map