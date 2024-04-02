"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = __importDefault(require("../controllers/lesson.controller"));
const route = express_1.default.Router({ mergeParams: true });
const PATH = {
    COURSE_LS: "/course/:course_id/lesson",
    LESSON: "/lesson/:lesson_id",
};
route.post(PATH.COURSE_LS, lesson_controller_1.default.addLesson);
route.get(PATH.COURSE_LS, lesson_controller_1.default.getLessons);
route.put(PATH.LESSON, lesson_controller_1.default.updateLesson);
route.get(PATH.LESSON, lesson_controller_1.default.getLesson);
route.delete(PATH.LESSON, lesson_controller_1.default.deleteLesson);
exports.default = route;
