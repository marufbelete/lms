"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const route = express_1.default.Router({ mergeParams: true });
route.put("/role", user_controller_1.default.addRoleToUser, errohandling_middleware_1.errorHandler);
route.delete("/role/:role_id", user_controller_1.default.deleteRoleFromUser, errohandling_middleware_1.errorHandler);
route.put("/course", user_controller_1.default.registerUserForCourse, errohandling_middleware_1.errorHandler);
route.get("/course", user_controller_1.default.getUserCoursesWithProgress, errohandling_middleware_1.errorHandler);
route.get("/course/info", user_controller_1.default.getUserCoursesInfo, errohandling_middleware_1.errorHandler);
route.get("/course/:course_id", user_controller_1.default.getUserCourseWithProgress, errohandling_middleware_1.errorHandler);
route.get("/course/:course_id/info", user_controller_1.default.getUserCourseInfo, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=user.route.js.map