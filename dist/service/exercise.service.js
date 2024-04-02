"use strict";
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
    static async insertExercise(param, t = {}) {
        const new_Exercise = new exercise_model_1.Exercise(param);
        const result = await new_Exercise.save(t);
        return result;
    }
    static async fetchExercises(filter) {
        const result = await exercise_model_1.Exercise.findAll(filter);
        return result;
    }
    static async fetchExercise(filter) {
        const result = await exercise_model_1.Exercise.findOne(filter);
        return result;
    }
    static async fetchExerciseUser(filter) {
        const result = await exercise_user_model_1.Exercise_User.findOne(filter);
        return result;
    }
    static async fetchExerciseUsers(filter) {
        const result = await exercise_user_model_1.Exercise_User.findAll(filter);
        return result;
    }
    static async editExercise(param, filter) {
        const result = await exercise_model_1.Exercise.update(param, filter);
        return result;
    }
    static async removeExercise(filter) {
        const result = await exercise_model_1.Exercise.destroy(filter);
        return result;
    }
    static async completeExercise(user_id, exercise_id, t = {}) {
        const param = { is_completed: true };
        const filter = {
            where: {
                userId: user_id,
                exerciseId: exercise_id,
            },
            ...t,
        };
        const result = await exercise_user_model_1.Exercise_User.update(param, filter);
        return result;
    }
    static async getCoursesWithProgress(filter) {
        const course_tracked = await course_user_model_1.Course_User.findAll({
            ...filter,
            include: [
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
            ],
        });
        const course_with_progress = course_tracked.map((e) => {
            var _a;
            const progress = (0, common_1.calculateCompletedExerciseWeight)(e);
            const current_lesson_id = e.currentLessonId;
            return {
                ...(_a = e.course) === null || _a === void 0 ? void 0 : _a.dataValues,
                progress,
                current_lesson_id,
            };
        });
        return course_with_progress;
    }
    static async getCoursesInfo(filter) {
        const course_info = await course_user_model_1.Course_User.findAll({
            ...filter,
            attributes: ["currentLessonId"],
            include: [
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
            ],
        });
        return course_info;
    }
    static async getExerciseMaxWeightToAssign(filter, lesson_id) {
        const lesson = await index_service_1.LessonService.fetchLesson({
            where: { id: lesson_id },
            attributes: ["weight"],
        });
        if (!lesson) {
            return (0, handleError_1.handleError)("lesson not found", 404);
        }
        const result = await exercise_model_1.Exercise.sum("weight", filter);
        return lesson.weight - result;
    }
}
exports.ExerciseService = ExerciseService;
