"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router({ mergeParams: true });
const exercise_controller_1 = __importDefault(require("../controllers/exercise.controller"));
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const PATH = {
    LESSON_EX: "/lesson/:lesson_id/exercise",
    EXERCISE: "/exercise/:exercise_id",
};
route.post(PATH.LESSON_EX, exercise_controller_1.default.addExercise, errohandling_middleware_1.errorHandler);
route.get(PATH.LESSON_EX, exercise_controller_1.default.getExercises, errohandling_middleware_1.errorHandler);
route.put(PATH.EXERCISE, exercise_controller_1.default.updateExercise, errohandling_middleware_1.errorHandler);
route.get(PATH.EXERCISE, exercise_controller_1.default.getExercise, errohandling_middleware_1.errorHandler);
route.delete(PATH.EXERCISE, exercise_controller_1.default.deleteExercise, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=exercise.route.js.map