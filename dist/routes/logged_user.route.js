"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const exercise_controller_1 = __importDefault(require("../controllers/exercise.controller"));
const file_1 = require("../helpers/file");
const logged_user_controller_1 = __importDefault(require("../controllers/logged_user.controller"));
const route = express_1.default.Router({ mergeParams: true });
route.put("/course", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.registerLoggedUserForCourse, errohandling_middleware_1.errorHandler);
route.put("/course/start", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.startCourse, errohandling_middleware_1.errorHandler);
route.get("/course", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getLoggedUserCoursesWithProgress, errohandling_middleware_1.errorHandler);
route.get("/course/info", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getUserCoursesInfo, errohandling_middleware_1.errorHandler);
route.get("/course/:course_id", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getLoggedUserCourseWithProgress, errohandling_middleware_1.errorHandler);
route.get("/course/:course_id/info", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getUserCourseInfo, errohandling_middleware_1.errorHandler);
route.get("/lesson/:lesson_id/exercise", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getUserExerciseInfo, errohandling_middleware_1.errorHandler);
route.put("/exercise/:exercise_id/validate", auth_middleware_1.authenticateJWT, exercise_controller_1.default.completeExercise, errohandling_middleware_1.errorHandler);
route.get("/profile", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getLoggedUserProfile, errohandling_middleware_1.errorHandler);
route.put("/profile", auth_middleware_1.authenticateJWT, file_1.uploadImage.single("avatar"), logged_user_controller_1.default.updateLoggedUserProfile, errohandling_middleware_1.errorHandler);
route.get("/collection", auth_middleware_1.authenticateJWT, logged_user_controller_1.default.getUserCollections, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=logged_user.route.js.map