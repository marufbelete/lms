"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = require("../helpers/handleError");
const lesson_model_1 = require("../models/lesson.model");
const index_service_1 = require("../service/index.service");
const common_validation_1 = require("../validation/common.validation");
const user_validation_1 = require("../validation/user.validation");
const models_1 = __importDefault(require("../models"));
const exercise_model_1 = require("../models/exercise.model");
const lesson_user_model_1 = require("../models/lesson_user.model");
const common_1 = require("../helpers/common");
const exercise_user_model_1 = require("../models/exercise_user.model");
exports.default = {
    addRoleToUser: async (req, res, next) => {
        try {
            const { id: user_id } = req.params;
            const { role_id } = req.body;
            const { error } = user_validation_1.roleToUserSchema.validate({
                user_id,
                role_id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(user_id);
            if (!user) {
                return (0, handleError_1.handleError)("user does not exist", 404);
            }
            const existing_user_roles = await (user === null || user === void 0 ? void 0 : user.$get("roles"));
            if (existing_user_roles === null || existing_user_roles === void 0 ? void 0 : existing_user_roles.find((e) => e.id === role_id)) {
                return (0, handleError_1.handleError)("This role already exist", 403);
            }
            const role = await index_service_1.RoleService.fetchRole({ where: { id: role_id } });
            if (!role) {
                return (0, handleError_1.handleError)("role not found", 404);
            }
            await (user === null || user === void 0 ? void 0 : user.$add("role", role));
            return res.status(201).json({
                success: true,
                message: "role added successfully",
            });
        }
        catch (err) {
            next(err);
        }
    },
    deleteRoleFromUser: async (req, res, next) => {
        try {
            const { id: user_id, role_id } = req.params;
            const { error } = user_validation_1.roleToUserSchema.validate({
                user_id,
                role_id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(user_id);
            if (!user) {
                (0, handleError_1.handleError)("user does not exist", 403);
            }
            const existing_user_roles = await (user === null || user === void 0 ? void 0 : user.$get("roles"));
            if (existing_user_roles === null || existing_user_roles === void 0 ? void 0 : existing_user_roles.find((e) => e.id === role_id)) {
                const role = await index_service_1.RoleService.fetchRole({ where: { id: role_id } });
                if (!role) {
                    return (0, handleError_1.handleError)("role not found", 404);
                }
                await (user === null || user === void 0 ? void 0 : user.$remove("role", role));
                return res.status(201).json({
                    success: true,
                    message: "role removed successfully",
                });
            }
            (0, handleError_1.handleError)("This role not exist for this user", 403);
        }
        catch (err) {
            next(err);
        }
    },
    registerUserForCourse: async (req, res, next) => {
        try {
            const { id: user_id } = req.params;
            const { course_id } = req.body;
            const { error } = user_validation_1.courseToUserSchema.validate({
                user_id,
                course_id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(user_id);
            if (!user) {
                return (0, handleError_1.handleError)("user does not exist", 403);
            }
            const existing_user_courses = await (user === null || user === void 0 ? void 0 : user.$get("courses"));
            if (existing_user_courses === null || existing_user_courses === void 0 ? void 0 : existing_user_courses.find((e) => e.id === course_id)) {
                (0, handleError_1.handleError)("This user already registerd for the course", 403);
            }
            const course = await index_service_1.CourseService.fetchCourse({
                where: { id: course_id },
                include: [
                    {
                        model: lesson_model_1.Lesson,
                        include: [
                            {
                                model: lesson_user_model_1.Lesson_User,
                            },
                            {
                                model: exercise_model_1.Exercise,
                            },
                        ],
                    },
                ],
            });
            if (!course) {
                return (0, handleError_1.handleError)("Course not exist", 403);
            }
            const leastOrderLesson = await index_service_1.LessonService.fetchLesson({
                where: { courseId: course_id },
                order: [
                    ["order", "ASC"],
                    ["createdAt", "ASC"],
                ],
            });
            if (!leastOrderLesson) {
                return (0, handleError_1.handleError)("lesson to start not found", 404);
            }
            return await models_1.default.transaction(async (t) => {
                const [course_user] = (await user.$add("course", course, {
                    through: { currentLessonId: leastOrderLesson.id },
                    transaction: t,
                }));
                const lesson_users = (await user.$add("lessons", course.lessons, {
                    through: { courseUserId: course_user.id },
                    transaction: t,
                }));
                await index_service_1.LessonService.editLessonUser({ is_started: true }, {
                    where: { lessonId: leastOrderLesson.id, userId: user_id },
                    transaction: t,
                });
                for (let lesson of (course === null || course === void 0 ? void 0 : course.lessons) || []) {
                    let lesson_user = lesson_users === null || lesson_users === void 0 ? void 0 : lesson_users.find((e) => e.lessonId === lesson.id);
                    await user.$add("exercises", lesson === null || lesson === void 0 ? void 0 : lesson.exercises, {
                        through: { lessonUserId: lesson_user === null || lesson_user === void 0 ? void 0 : lesson_user.id },
                        transaction: t,
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: "You are registerd for the course successfully",
                });
            });
        }
        catch (err) {
            next(err);
        }
    },
    getUserCoursesWithProgress: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({
                id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(id);
            if (!user) {
                (0, handleError_1.handleError)("user does not exist", 403);
            }
            const user_courses = await index_service_1.ExerciseService.getCoursesWithProgress({
                where: { userId: id },
            });
            return res.json(user_courses);
        }
        catch (err) {
            next(err);
        }
    },
    getUserCoursesInfo: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({
                id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(id);
            if (!user) {
                (0, handleError_1.handleError)("user does not exist", 403);
            }
            const user_courses = await index_service_1.ExerciseService.getCoursesInfo({
                where: { userId: id },
                order: [
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: lesson_model_1.Lesson, as: "lesson" },
                        "order",
                        "ASC",
                    ],
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: lesson_model_1.Lesson, as: "lesson" },
                        "createdAt",
                        "ASC",
                    ],
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: exercise_user_model_1.Exercise_User, as: "exercise_users" },
                        { model: exercise_model_1.Exercise, as: "exercise" },
                        "order",
                        "ASC",
                    ],
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: exercise_user_model_1.Exercise_User, as: "exercise_users" },
                        { model: exercise_model_1.Exercise, as: "exercise" },
                        "createdAt",
                        "ASC",
                    ],
                ],
            });
            return res.json((0, common_1.mapCourseUserInfo)(user_courses));
        }
        catch (err) {
            next(err);
        }
    },
    getUserCourseWithProgress: async (req, res, next) => {
        try {
            const { id: user_id, course_id } = req.params;
            const { error } = user_validation_1.courseToUserSchema.validate({
                user_id,
                course_id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(user_id);
            if (!user) {
                (0, handleError_1.handleError)("user does not exist", 403);
            }
            const user_course = await index_service_1.ExerciseService.getCoursesWithProgress({
                where: { userId: user_id, courseId: course_id },
            });
            if (user_course.length == 0) {
                return (0, handleError_1.handleError)("Course progress for the user not found", 404);
            }
            return res.json(user_course[0]);
        }
        catch (err) {
            next(err);
        }
    },
    getUserCourseInfo: async (req, res, next) => {
        try {
            const { id: user_id, course_id } = req.params;
            const { error } = user_validation_1.courseToUserSchema.validate({
                user_id,
                course_id,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const user = await index_service_1.UserService.fetchUserById(user_id);
            if (!user) {
                (0, handleError_1.handleError)("user does not exist", 403);
            }
            const user_courses = await index_service_1.ExerciseService.getCoursesInfo({
                where: { userId: user_id, courseId: course_id },
                order: [
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: lesson_model_1.Lesson, as: "lesson" },
                        "order",
                        "ASC",
                    ],
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: lesson_model_1.Lesson, as: "lesson" },
                        "createdAt",
                        "ASC",
                    ],
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: exercise_user_model_1.Exercise_User, as: "exercise_users" },
                        { model: exercise_model_1.Exercise, as: "exercise" },
                        "order",
                        "ASC",
                    ],
                    [
                        { model: lesson_user_model_1.Lesson_User, as: "lesson_users" },
                        { model: exercise_user_model_1.Exercise_User, as: "exercise_users" },
                        { model: exercise_model_1.Exercise, as: "exercise" },
                        "createdAt",
                        "ASC",
                    ],
                ],
            });
            if (user_courses.length < 1) {
                (0, handleError_1.handleError)("course not found", 404);
            }
            const [user_course] = (0, common_1.mapCourseUserInfo)(user_courses);
            return res.json(user_course);
        }
        catch (err) {
            next(err);
        }
    },
};
