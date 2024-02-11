"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseService = void 0;
const common_1 = require("../helpers/common");
const handleError_1 = require("../helpers/handleError");
const course_model_1 = require("../models/course.model");
const course_user_model_1 = require("../models/course_user.model");
const exercise_model_1 = require("../models/exercise.model");
const exercise_user_model_1 = require("../models/exercise_user.model");
const lesson_model_1 = require("../models/lesson.model");
const lesson_user_model_1 = require("../models/lesson_user.model");
const index_service_1 = require("./index.service");
class ExerciseService {
    static insertExercise(param, t = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_Exercise = new exercise_model_1.Exercise(param);
            const result = yield new_Exercise.save(t);
            return result;
        });
    }
    static fetchExercises(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exercise_model_1.Exercise.findAll(filter);
            return result;
        });
    }
    static fetchExercise(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exercise_model_1.Exercise.findOne(filter);
            return result;
        });
    }
    static fetchExerciseUser(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exercise_user_model_1.Exercise_User.findOne(filter);
            return result;
        });
    }
    static fetchExerciseUsers(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exercise_user_model_1.Exercise_User.findAll(filter);
            return result;
        });
    }
    static editExercise(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exercise_model_1.Exercise.update(param, filter);
            return result;
        });
    }
    static removeExercise(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exercise_model_1.Exercise.destroy(filter);
            return result;
        });
    }
    static completeExercise(user_id, exercise_id, t = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = { is_completed: true };
            const filter = Object.assign({ where: {
                    userId: user_id,
                    exerciseId: exercise_id,
                } }, t);
            const result = yield exercise_user_model_1.Exercise_User.update(param, filter);
            return result;
        });
    }
    static getCoursesWithProgress(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const course_tracked = yield course_user_model_1.Course_User.findAll(Object.assign(Object.assign({}, filter), { include: [
                    {
                        model: course_model_1.Course,
                    },
                    {
                        model: lesson_user_model_1.Lesson_User,
                        attributes: ["is_started"],
                        include: [
                            {
                                model: lesson_model_1.Lesson,
                                attributes: ["weight"],
                            },
                            {
                                model: exercise_user_model_1.Exercise_User,
                                attributes: ["is_completed"],
                                include: [
                                    {
                                        model: exercise_model_1.Exercise,
                                        attributes: ["weight"],
                                    },
                                ],
                            },
                        ],
                    },
                ] }));
            const course_with_progress = course_tracked.map((e) => {
                var _a;
                const progress = (0, common_1.calculateCompletedExerciseWeight)(e);
                const current_lesson_id = e.currentLessonId;
                return Object.assign(Object.assign({}, (_a = e.course) === null || _a === void 0 ? void 0 : _a.dataValues), { progress,
                    current_lesson_id });
            });
            return course_with_progress;
        });
    }
    static getCoursesInfo(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const course_info = yield course_user_model_1.Course_User.findAll(Object.assign(Object.assign({}, filter), { attributes: ["currentLessonId"], include: [
                    {
                        model: course_model_1.Course,
                        attributes: ["id", "title", "description"],
                    },
                    {
                        model: lesson_user_model_1.Lesson_User,
                        attributes: ["is_started", "is_completed"],
                        include: [
                            {
                                model: lesson_model_1.Lesson,
                                attributes: ["id", "title"],
                            },
                            {
                                model: exercise_user_model_1.Exercise_User,
                                attributes: ["is_completed"],
                                include: [
                                    {
                                        model: exercise_model_1.Exercise,
                                        attributes: ["id", "title"],
                                    },
                                ],
                            },
                        ],
                    },
                ] }));
            return course_info;
        });
    }
    static getExerciseMaxWeightToAssign(filter, lesson_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield index_service_1.LessonService.fetchLesson({
                where: { id: lesson_id },
                attributes: ["weight"],
            });
            if (!lesson) {
                return (0, handleError_1.handleError)("lesson not found", 404);
            }
            const result = yield exercise_model_1.Exercise.sum("weight", filter);
            return lesson.weight - result;
        });
    }
}
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map