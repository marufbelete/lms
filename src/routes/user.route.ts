import express from "express";
import UserController from "../controllers/user.controller";
import { errorHandler } from "../middleware/errohandling.middleware";
const route = express.Router({ mergeParams: true });

route.put("/role", UserController.addRoleToUser, errorHandler);
route.delete("/role/:role_id", UserController.deleteRoleFromUser, errorHandler);
route.put("/course", UserController.registerUserForCourse, errorHandler);
route.get("/course", UserController.getUserCoursesWithProgress, errorHandler);
route.get("/course/info", UserController.getUserCoursesInfo, errorHandler);
route.get(
  "/course/:course_id",
  UserController.getUserCourseWithProgress,
  errorHandler
);
route.get(
  "/course/:course_id/info",
  UserController.getUserCourseInfo,
  errorHandler
);

export default route;
