import express from "express";
import LessonController from "../controllers/lesson.controller";
const route = express.Router({ mergeParams: true });
const PATH = {
  COURSE_LS: "/course/:course_id/lesson",
  LESSON: "/lesson/:lesson_id",
};

route.post(PATH.COURSE_LS, LessonController.addLesson);
route.get(PATH.COURSE_LS, LessonController.getLessons);
route.put(PATH.LESSON, LessonController.updateLesson);
route.get(PATH.LESSON, LessonController.getLesson);
route.delete(PATH.LESSON, LessonController.deleteLesson);

export default route;
