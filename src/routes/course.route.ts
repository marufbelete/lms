import express from "express";
const route = express.Router({ mergeParams: true });
import { errorHandler } from "../middleware/errohandling.middleware";
import { uploadImage } from "../helpers/file";
import CourseController from "../controllers/course.controller";

route.post(
  "/",
  uploadImage.single("image"),
  CourseController.addCourse,
  errorHandler
);

route.get("/", CourseController.getCourses, errorHandler);

route.get("/info", CourseController.getCoursesInfo, errorHandler);

route.put(
  "/:id",
  uploadImage.single("image"),
  CourseController.updateCourse,
  errorHandler
);

route.get("/:id", CourseController.getCourse, errorHandler);

route.get("/:id/info", CourseController.getCourseInfo, errorHandler);

route.delete("/:id", CourseController.deleteCourse, errorHandler);

export default route;
