"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const route = express_1.default.Router({ mergeParams: true });
route.put("/role", user_controller_1.default.addRoleToUser);
route.delete("/role/:role_id", user_controller_1.default.deleteRoleFromUser);
route.put("/course", user_controller_1.default.registerUserForCourse);
route.get("/course", user_controller_1.default.getUserCoursesWithProgress);
route.get("/course/info", user_controller_1.default.getUserCoursesInfo);
route.get("/course/:course_id", user_controller_1.default.getUserCourseWithProgress);
route.get("/course/:course_id/info", user_controller_1.default.getUserCourseInfo);
exports.default = route;
