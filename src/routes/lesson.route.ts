import express from "express";
import { errorHandler } from "../middleware/errohandling.middleware";
import LessonController from "../controllers/lesson.controller";
const route = express.Router({ mergeParams: true });
const PATH = {
  COURSE_LS: "/course/:course_id/lesson",
  LESSON: "/lesson/:lesson_id",
};
route.post(PATH.COURSE_LS, LessonController.addLesson, errorHandler);

route.get(PATH.COURSE_LS, LessonController.getLessons, errorHandler);

route.put(PATH.LESSON, LessonController.updateLesson, errorHandler);

route.get(PATH.LESSON, LessonController.getLesson, errorHandler);

route.delete(PATH.LESSON, LessonController.deleteLesson, errorHandler);

export default route;
