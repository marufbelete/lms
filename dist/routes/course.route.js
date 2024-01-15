"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router({ mergeParams: true });
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const file_1 = require("../helpers/file");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
route.post("/", file_1.uploadImage.single("image"), course_controller_1.default.addCourse, errohandling_middleware_1.errorHandler);
route.get("/", course_controller_1.default.getCourses, errohandling_middleware_1.errorHandler);
route.get("/info", course_controller_1.default.getCoursesInfo, errohandling_middleware_1.errorHandler);
route.put("/:id", file_1.uploadImage.single("image"), course_controller_1.default.updateCourse, errohandling_middleware_1.errorHandler);
route.get("/:id", course_controller_1.default.getCourse, errohandling_middleware_1.errorHandler);
route.get("/:id/info", course_controller_1.default.getCourseInfo, errohandling_middleware_1.errorHandler);
route.delete("/:id", course_controller_1.default.deleteCourse, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=course.route.js.map