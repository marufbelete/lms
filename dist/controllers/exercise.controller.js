"use strict";
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
    addExercise: async (req, res, next) => {
        try {
            const param = req.body;
            const { lesson_id } = req.params;
            const { error } = await (0, exercise_validation_1.validateAddExerciseInput)({
                ...param,
                lesson_id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 400);
            }
            return await models_1.default.transaction(async (t) => {
                var _a;
                const exercise = await index_service_1.ExerciseService.insertExercise(param, {
                    transaction: t,
                });
                const stepValidationParam = req.body.stepValidation;
                if (stepValidationParam) {
                    await exercise.$create("step_validation", stepValidationParam, {
                        transaction: t,
                    });
                }
                const lesson = await index_service_1.LessonService.fetchLesson({
                    where: { id: lesson_id },
                });
                if (!lesson) {
                    return (0, handleError_1.handleError)("error with exercise r/n", 403);
                }
                await lesson.$add("exercise", exercise, { transaction: t });
                const lesson_takers = await lesson_user_model_1.Lesson_User.findAll({
                    where: { lessonId: lesson_id },
                    include: { model: user_model_1.User },
                });
                //add to exsting user
                if (lesson_takers.length > 0) {
                    for (const lesson_taker of lesson_takers) {
                        await ((_a = lesson_taker.user) === null || _a === void 0 ? void 0 : _a.$add("exercise", exercise, {
                            through: { lessonUserId: lesson_taker.id },
                            transaction: t,
                        }));
                    }
                }
                await exercise.reload({ transaction: t });
                return res.status(201).json(exercise);
            });
        }
        catch (error) {
            next(error);
        }
    },
    getExercises: async (req, res, next) => {
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
            const result = await index_service_1.ExerciseService.fetchExercises(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    },
    completeExercise: async (req, res, next) => {
        try {
            const { exercise_id } = req.params;
            const { type, input } = req.body;
            const { error } = exercise_validation_1.completeExerciseSchema.validate({
                ...req.body,
                ...req.params,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 400);
            }
            const user = await (0, user_1.getLoggedUser)(req);
            if (!user) {
                return (0, handleError_1.handleError)("user not found", 404);
            }
            const exercise = await index_service_1.ExerciseService.fetchExercise({
                where: { id: exercise_id },
            });
            if (!exercise) {
                return (0, handleError_1.handleError)("exercise not found", 404);
            }
            const step_validation = await exercise.$get("step_validation");
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
            const lesson = await (exercise === null || exercise === void 0 ? void 0 : exercise.$get("lesson"));
            const lesson_user = await (lesson === null || lesson === void 0 ? void 0 : lesson.$get("lesson_users", {
                where: { userId: user.id },
            }));
            return await models_1.default.transaction(async (t) => {
                await index_service_1.ExerciseService.completeExercise(user.id, exercise_id, {
                    transaction: t,
                });
                if (!lesson_user || lesson_user.length <= 0) {
                    return (0, handleError_1.handleError)("Error with course relation", 403);
                }
                const exercise_user = await index_service_1.ExerciseService.fetchExerciseUsers({
                    where: { lessonUserId: lesson_user[0].id },
                    transaction: t,
                });
                if ((0, common_1.isAllCompleted)(exercise_user)) {
                    if (!lesson) {
                        return (0, handleError_1.handleError)("error with the exercise", 400);
                    }
                    const next_lesson = await index_service_1.LessonService.getNextLeastOrderLesson(lesson.courseId, lesson.order);
                    const course_user = await index_service_1.CourseService.fetchCourse_User({
                        where: { courseId: lesson.courseId, userId: user.id },
                    });
                    if (!course_user) {
                        return (0, handleError_1.handleError)("Error with course relation", 403);
                    }
                    await index_service_1.LessonService.editLessonUser({ is_completed: true }, {
                        where: {
                            is_completed: false,
                            is_started: true,
                            userId: user.id,
                            courseUserId: course_user.id,
                        },
                        transaction: t,
                    });
                    if (next_lesson) {
                        await index_service_1.LessonService.editLessonUser({ is_started: true }, {
                            where: { lessonId: next_lesson.id, userId: user.id },
                            transaction: t,
                        });
                        course_user.currentLessonId = next_lesson.id;
                        await course_user.save({ transaction: t });
                    }
                }
                return res.status(201).json({
                    message: step_validation.success_message,
                    success: true,
                });
            });
        }
        catch (error) {
            next(error);
        }
    },
    updateExercise: async (req, res, next) => {
        try {
            const { exercise_id } = req.params;
            const param = req.body;
            const exercise = await index_service_1.ExerciseService.fetchExercise({
                where: { id: exercise_id },
            });
            if (!exercise)
                return (0, handleError_1.handleError)("exercise not found", 404);
            const { error } = await (0, exercise_validation_1.validateUpdateExerciseInput)({
                exercise_id,
                lesson_id: exercise.lessonId,
                ...param,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 400);
            }
            // Fetch existing exercise with associated StepValidation if it exists
            const existingExercise = await exercise_model_1.Exercise.findOne({
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
                    await (existingExercise === null || existingExercise === void 0 ? void 0 : existingExercise.step_validation.update(stepValidationParam));
                }
                else {
                    await step_validation_model_1.StepValidation.create({
                        ...stepValidationParam,
                        exerciseId: existingExercise.id,
                    });
                }
            }
            const updatedExercise = await (existingExercise === null || existingExercise === void 0 ? void 0 : existingExercise.update(param));
            return res.status(200).json(updatedExercise);
        }
        catch (error) {
            next(error);
        }
    },
    getExercise: async (req, res, next) => {
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
            const result = await index_service_1.ExerciseService.fetchExercise(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    },
    deleteExercise: async (req, res, next) => {
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
            const result = await index_service_1.ExerciseService.removeExercise(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    },
};
