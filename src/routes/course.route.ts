import express from "express";
const route = express.Router({ mergeParams: true });
import { uploadImage } from "../helpers/file";
import CourseController from "../controllers/course.controller";

route.post("/", uploadImage.single("image"), CourseController.addCourse);
route.get("/", CourseController.getCourses);
route.get("/info", CourseController.getCoursesInfo);
route.put("/:id", uploadImage.single("image"), CourseController.updateCourse);
route.get("/:id", CourseController.getCourse);
route.get("/:id/info", CourseController.getCourseInfo);
route.delete("/:id", CourseController.deleteCourse);

export default route;
