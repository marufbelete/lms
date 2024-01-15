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
const lesson_model_1 = require("../models/lesson.model");
const step_validation_model_1 = require("../models/step_validation.model");
const exercise_model_1 = require("../models/exercise.model");
const user_model_1 = require("../models/user.model");
const lesson_user_model_1 = require("../models/lesson_user.model");
const models_1 = __importDefault(require("../models"));
const handleError_1 = require("../helpers/handleError");
const exercise_validation_1 = require("../validation/exercise.validation");
const index_service_1 = require("../service/index.service");
const user_1 = require("../helpers/user");
const common_1 = require("../helpers/common");
const common_validation_1 = require("../validation/common.validation");
exports.default = {
    addExercise: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const param = req.body;
                const { lesson_id } = req.params;
                const { error } = yield (0, exercise_validation_1.validateAddExerciseInput)(Object.assign(Object.assign({}, param), { lesson_id }));
                if (error) {
                    (0, handleError_1.handleError)(error.message, 400);
                }
                const exercise = yield index_service_1.ExerciseService.insertExercise(param, {
                    transaction: t,
                });
                const stepValidationParam = req.body.stepValidation;
                if (stepValidationParam) {
                    yield exercise.$create("step_validation", stepValidationParam, {
                        transaction: t,
                    });
                }
                const lesson = yield index_service_1.LessonService.fetchLesson({
                    where: { id: lesson_id },
                });
                if (!lesson) {
                    return (0, handleError_1.handleError)("lesson does not exist", 403);
                }
                yield lesson.$add("exercise", exercise, { transaction: t });
                const lesson_takers = yield lesson_user_model_1.Lesson_User.findAll({
                    where: { lessonId: lesson_id },
                    include: { model: user_model_1.User },
                });
                //add to exsting user
                if (lesson_takers.length > 0) {
                    for (const lesson_taker of lesson_takers) {
                        yield ((_a = lesson_taker.user) === null || _a === void 0 ? void 0 : _a.$add("exercise", exercise, {
                            through: { lessonUserId: lesson_taker.id },
                            transaction: t,
                        }));
                    }
                }
                yield exercise.reload({ transaction: t });
                return res.status(201).json(exercise);
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    getExercises: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { lesson } = req.query;
            const { lesson_id } = req.params;
            const filter = {
                where: {
                    lessonId: lesson_id,
                },
                include: [
                    {
                        model: step_validation_model_1.StepValidation,
                        attributes: ["type"],
                    },
                ],
                order: [
                    ["order", "ASC"],
                    ["createdAt", "ASC"],
                ],
            };
            if (lesson) {
                filter.include.push({
                    model: lesson_model_1.Lesson,
                });
            }
            const result = yield index_service_1.ExerciseService.fetchExercises(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    completeExercise: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                const { exercise_id } = req.params;
                const { type, input } = req.body;
                const { error } = exercise_validation_1.completeExerciseSchema.validate(Object.assign(Object.assign({}, req.body), req.params));
                if (error) {
                    (0, handleError_1.handleError)(error.message, 400);
                }
                const user = yield (0, user_1.getLoggedUser)(req);
                if (!user) {
                    return (0, handleError_1.handleError)("user not found", 404);
                }
                const exercise = yield index_service_1.ExerciseService.fetchExercise({
                    where: { id: exercise_id },
                });
                if (!exercise) {
                    return (0, handleError_1.handleError)("exercise not found", 404);
                }
                const step_validation = yield exercise.$get("step_validation");
                if (!step_validation) {
                    return (0, handleError_1.handleError)("Step validation not found", 404);
                }
                if (step_validation.type.toLowerCase().trim() !== "info") {
                    if (step_validation.type.toLowerCase().trim() !==
                        type.toLowerCase().trim() ||
                        step_validation.input.toLowerCase().trim() !==
                            input.toLowerCase().trim()) {
                        (0, handleError_1.handleError)(step_validation.error_message, 403);
                    }
                }
                const lesson = yield (exercise === null || exercise === void 0 ? void 0 : exercise.$get("lesson"));
                const lesson_user = yield (lesson === null || lesson === void 0 ? void 0 : lesson.$get("lesson_users", {
                    where: { userId: user.id },
                }));
                yield index_service_1.ExerciseService.completeExercise(user.id, exercise_id, {
                    transaction: t,
                });
                if (!lesson_user || lesson_user.length <= 0) {
                    return (0, handleError_1.handleError)("Error with course relation", 403);
                }
                const exercise_user = yield index_service_1.ExerciseService.fetchExerciseUsers({
                    where: { lessonUserId: lesson_user[0].id },
                    transaction: t,
                });
                if ((0, common_1.isAllCompleted)(exercise_user)) {
                    if (!lesson) {
                        return (0, handleError_1.handleError)("error with the exercise", 400);
                    }
                    const next_lesson = yield index_service_1.LessonService.getNextLeastOrderLesson(lesson.courseId, lesson.order);
                    const course_user = yield index_service_1.CourseService.fetchCourse_User({
                        where: { courseId: lesson.courseId, userId: user.id },
                    });
                    if (!course_user) {
                        return (0, handleError_1.handleError)("Error with course relation", 403);
                    }
                    yield index_service_1.LessonService.editLessonUser({ is_completed: true }, {
                        where: {
                            is_completed: false,
                            is_started: true,
                            userId: user.id,
                            courseUserId: course_user.id,
                        },
                        transaction: t,
                    });
                    if (next_lesson) {
                        yield index_service_1.LessonService.editLessonUser({ is_started: true }, {
                            where: { lessonId: next_lesson.id, userId: user.id },
                            transaction: t,
                        });
                        course_user.currentLessonId = next_lesson.id;
                        yield course_user.save({ transaction: t });
                    }
                }
                return res.status(201).json({
                    message: step_validation.success_message,
                    success: true,
                });
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    updateExercise: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { exercise_id } = req.params;
            const param = req.body;
            const exercise = yield index_service_1.ExerciseService.fetchExercise({
                where: { id: exercise_id },
            });
            if (!exercise)
                return (0, handleError_1.handleError)("exercise not found", 404);
            const { error } = yield (0, exercise_validation_1.validateUpdateExerciseInput)(Object.assign({ exercise_id, lesson_id: exercise.lessonId }, param));
            if (error) {
                (0, handleError_1.handleError)(error.message, 400);
            }
            // Fetch existing exercise with associated StepValidation if it exists
            const existingExercise = yield exercise_model_1.Exercise.findOne({
                where: { id: exercise_id },
                include: step_validation_model_1.StepValidation,
            });
            if (!existingExercise) {
                return (0, handleError_1.handleError)("Exercise not found", 404);
            }
            // Extract StepValidation parameters from the request and update/create as necessary
            const stepValidationParam = req.body.stepValidation;
            if (stepValidationParam) {
                if (existingExercise.step_validation) {
                    yield (existingExercise === null || existingExercise === void 0 ? void 0 : existingExercise.step_validation.update(stepValidationParam));
                }
                else {
                    yield step_validation_model_1.StepValidation.create(Object.assign(Object.assign({}, stepValidationParam), { exerciseId: existingExercise.id }));
                }
            }
            const updatedExercise = yield (existingExercise === null || existingExercise === void 0 ? void 0 : existingExercise.update(param));
            return res.status(200).json(updatedExercise);
        }
        catch (error) {
            next(error);
        }
    }),
    getExercise: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { exercise_id } = req.params;
            const { lesson } = req.query;
            const { error } = common_validation_1.getByIdSchema.validate({ id: exercise_id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id: exercise_id },
                include: [
                    {
                        model: step_validation_model_1.StepValidation,
                        attributes: ["type"],
                    },
                ],
            };
            if (lesson) {
                filter.include.push({
                    model: lesson_model_1.Lesson,
                });
            }
            const result = yield index_service_1.ExerciseService.fetchExercise(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteExercise: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { exercise_id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id: exercise_id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: {
                    id: exercise_id,
                },
            };
            const result = yield index_service_1.ExerciseService.removeExercise(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=exercise.controller.js.map