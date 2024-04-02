import express from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import ExerciseController from "../controllers/exercise.controller";
import { uploadImage } from "../helpers/file";
import Logged_userController from "../controllers/logged_user.controller";
const route = express.Router({ mergeParams: true });

route.put(
  "/course",
  authenticateJWT,
  Logged_userController.registerLoggedUserForCourse
);
route.put("/course/start", authenticateJWT, Logged_userController.startCourse);
route.get(
  "/course",
  authenticateJWT,
  Logged_userController.getLoggedUserCoursesWithProgress
);
route.get(
  "/course/info",
  authenticateJWT,
  Logged_userController.getUserCoursesInfo
);
route.get(
  "/course/:course_id",
  authenticateJWT,
  Logged_userController.getLoggedUserCourseWithProgress
);
route.get(
  "/course/:course_id/info",
  authenticateJWT,
  Logged_userController.getUserCourseInfo
);
route.get(
  "/lesson/:lesson_id/exercise",
  authenticateJWT,
  Logged_userController.getUserExerciseInfo
);
route.put(
  "/exercise/:exercise_id/validate",
  authenticateJWT,
  ExerciseController.completeExercise
);
route.get(
  "/profile",
  authenticateJWT,
  Logged_userController.getLoggedUserProfile
);
route.put(
  "/profile",
  authenticateJWT,
  uploadImage.single("avatar"),
  Logged_userController.updateLoggedUserProfile
);
route.get(
  "/collection",
  authenticateJWT,
  Logged_userController.getUserCollections
);

export default route;
