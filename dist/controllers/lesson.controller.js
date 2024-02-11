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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = require("../models/course.model");
const exercise_model_1 = require("../models/exercise.model");
const course_user_model_1 = require("../models/course_user.model");
const user_model_1 = require("../models/user.model");
const models_1 = __importDefault(require("../models"));
const lesson_validation_1 = require("../validation/lesson.validation");
const handleError_1 = require("../helpers/handleError");
const index_service_1 = require("../service/index.service");
const common_validation_1 = require("../validation/common.validation");
exports.default = {
    addLesson: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const param = req.body;
                const { course_id } = req.params;
                const { error } = yield (0, lesson_validation_1.validateAddLessonInput)(Object.assign(Object.assign({}, param), { course_id }));
                if (error) {
                    (0, handleError_1.handleError)(error.message, 403);
                }
                const lesson = yield index_service_1.LessonService.insertLesson(param, {
                    transaction: t,
                });
                const course = yield index_service_1.CourseService.fetchCourse({
                    where: { id: course_id },
                });
                if (!course) {
                    return (0, handleError_1.handleError)("course does not exist", 403);
                }
                yield course.$add("lesson", lesson, { transaction: t });
                //add to existing user
                const course_takers = yield course_user_model_1.Course_User.findAll({
                    where: { courseId: course_id },
                    include: { model: user_model_1.User },
                });
                if (course_takers.length > 0) {
                    for (const course_taker of course_takers) {
                        yield ((_a = course_taker.user) === null || _a === void 0 ? void 0 : _a.$add("lesson", lesson, {
                            through: { courseUserId: course_taker.id },
                            transaction: t,
                        }));
                    }
                }
                yield lesson.reload({ transaction: t });
                return res.status(201).json(lesson);
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    getLessons: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const { course, exercise } = req.query;
            const { course_id } = req.params;
            const filter = {
                where: {
                    courseId: course_id,
                },
                include: [],
                order: [
                    ["order", "ASC"],
                    ["createdAt", "ASC"],
                ],
            };
            if (course) {
                (_b = filter.include) === null || _b === void 0 ? void 0 : _b.push({
                    model: course_model_1.Course,
                });
            }
            if (exercise) {
                filter.order.push([{ model: exercise_model_1.Exercise, as: "exercises" }, "order", "ASC"], [{ model: exercise_model_1.Exercise, as: "exercises" }, "createdAt", "ASC"]);
                filter.include.push({
                    model: exercise_model_1.Exercise,
                });
            }
            const result = yield index_service_1.LessonService.fetchLessons(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    updateLesson: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { lesson_id } = req.params;
            const param = req.body;
            const filter = {
                where: {
                    id: lesson_id,
                },
            };
            const lesson = yield index_service_1.LessonService.fetchLesson({
                where: { id: lesson_id },
            });
            if (!lesson) {
                return (0, handleError_1.handleError)("lesson not found", 404);
            }
            const { error } = yield (0, lesson_validation_1.validateUpdateLessonInput)(Object.assign({ course_id: lesson.courseId, lesson_id }, param));
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = yield index_service_1.LessonService.editLesson(param, filter);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    getLesson: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { lesson_id } = req.params;
            const { course, exercise } = req.query;
            const { error } = common_validation_1.getByIdSchema.validate({ id: lesson_id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id: lesson_id },
                include: [],
            };
            if (course) {
                filter.include.push({
                    model: course_model_1.Course,
                });
            }
            if (exercise) {
                filter.order = [
                    [{ model: exercise_model_1.Exercise, as: "exercises" }, "order", "ASC"],
                    [{ model: exercise_model_1.Exercise, as: "exercises" }, "createdAt", "ASC"],
                ];
                filter.include.push({
                    model: exercise_model_1.Exercise,
                });
            }
            const result = yield index_service_1.LessonService.fetchLesson(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteLesson: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { lesson_id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id: lesson_id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: {
                    id: lesson_id,
                },
            };
            const result = yield index_service_1.LessonService.removeLesson(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=lesson.controller.js.map