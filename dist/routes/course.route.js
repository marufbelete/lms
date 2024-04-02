"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router({ mergeParams: true });
const file_1 = require("../helpers/file");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
route.post("/", file_1.uploadImage.single("image"), course_controller_1.default.addCourse);
route.get("/", course_controller_1.default.getCourses);
route.get("/info", course_controller_1.default.getCoursesInfo);
route.put("/:id", file_1.uploadImage.single("image"), course_controller_1.default.updateCourse);
route.get("/:id", course_controller_1.default.getCourse);
route.get("/:id/info", course_controller_1.default.getCourseInfo);
route.delete("/:id", course_controller_1.default.deleteCourse);
exports.default = route;
