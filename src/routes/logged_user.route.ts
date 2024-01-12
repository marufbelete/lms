import express from "express";
import { errorHandler } from "../middleware/errohandling.middleware";
import { authenticateJWT } from "../middleware/auth.middleware";
import ExerciseController from "../controllers/exercise.controller";
import { uploadImage } from "../helpers/file";
import Logged_userController from "../controllers/logged_user.controller";
import CollectionController from "../controllers/collection.controller";
const route = express.Router({ mergeParams: true });

route.put(
  "/course",
  authenticateJWT,
  Logged_userController.registerLoggedUserForCourse,
  errorHandler
);
route.put(
  "/course/start",
  authenticateJWT,
  Logged_userController.startCourse,
  errorHandler
);
route.get(
  "/course",
  authenticateJWT,
  Logged_userController.getLoggedUserCoursesWithProgress,
  errorHandler
);
route.get(
  "/course/info",
  authenticateJWT,
  Logged_userController.getUserCoursesInfo,
  errorHandler
);
route.get(
  "/course/:course_id",
  authenticateJWT,
  Logged_userController.getLoggedUserCourseWithProgress,
  errorHandler
);
route.get(
  "/course/:course_id/info",
  authenticateJWT,
  Logged_userController.getUserCourseInfo,
  errorHandler
);
route.get(
  "/lesson/:lesson_id/exercise",
  authenticateJWT,
  Logged_userController.getUserExerciseInfo,
  errorHandler
);
route.put(
  "/exercise/:exercise_id/validate",
  authenticateJWT,
  ExerciseController.completeExercise,
  errorHandler
);
route.get(
  "/profile",
  authenticateJWT,
  Logged_userController.getLoggedUserProfile,
  errorHandler
);
route.put(
  "/profile",
  authenticateJWT,
  uploadImage.single("avatar"),
  Logged_userController.updateLoggedUserProfile,
  errorHandler
);
route.get(
  "/collection",
  authenticateJWT,
  CollectionController.getCollections,
  errorHandler
);
route.get(
  "/collection/:id",
  authenticateJWT,
  CollectionController.getCollection,
  errorHandler
);

export default route;
