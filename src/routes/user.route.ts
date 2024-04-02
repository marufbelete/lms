import express from "express";
import UserController from "../controllers/user.controller";
import { errorHandler } from "../middleware/errohandling.middleware";
const route = express.Router({ mergeParams: true });

route.put("/role", UserController.addRoleToUser);
route.delete("/role/:role_id", UserController.deleteRoleFromUser);
route.put("/course", UserController.registerUserForCourse);
route.get("/course", UserController.getUserCoursesWithProgress);
route.get("/course/info", UserController.getUserCoursesInfo);
route.get("/course/:course_id", UserController.getUserCourseWithProgress);
route.get("/course/:course_id/info", UserController.getUserCourseInfo);

export default route;
