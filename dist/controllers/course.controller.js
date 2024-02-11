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
const file_1 = require("../helpers/file");
const common_1 = require("../helpers/common");
const models_1 = __importDefault(require("../models"));
const course_model_1 = require("../models/course.model");
const course_validation_1 = require("../validation/course.validation");
const handleError_1 = require("../helpers/handleError");
const config_1 = __importDefault(require("../config/config"));
const index_service_1 = require("../service/index.service");
const exercise_model_1 = require("../models/exercise.model");
const lesson_model_1 = require("../models/lesson.model");
const common_validation_1 = require("../validation/common.validation");
exports.default = {
    addCourse: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                const param = req.body;
                const { error } = course_validation_1.addCourseSchema.validate(param);
                if (error) {
                    (0, handleError_1.handleError)(error.message, 403);
                }
                let cover_url;
                if (req.file) {
                    const key = yield (0, file_1.saveImage)(req.file, config_1.default.AWS_COURSE_FOLDER);
                    cover_url = yield (0, file_1.getImage)(key);
                    param.image = key;
                }
                const result = yield index_service_1.CourseService.insertCourse(param, {
                    transaction: t,
                });
                if (param.prerequisiteIds && param.prerequisiteIds.length > 0) {
                    const prerequisite_info = param.prerequisiteIds.map((id) => ({
                        requisiteId: result.id,
                        prereqId: id,
                    }));
                    yield index_service_1.CourseService.insertBulkPrerequisite(prerequisite_info, {
                        transaction: t,
                    });
                    yield result.reload({
                        include: [
                            {
                                model: course_model_1.Course,
                                as: "prereq",
                                through: {
                                    attributes: [],
                                },
                                attributes: ["id", "title", "description"],
                            },
                        ],
                        transaction: t,
                    });
                }
                result.dataValues.cover_url = cover_url;
                return res.status(201).json(result);
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    getCourses: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { lesson, page, pageSize } = req.query;
            const filter = {
                include: [
                    {
                        model: course_model_1.Course,
                        as: "prereq",
                        through: {
                            attributes: [],
                        },
                        attributes: ["id", "title", "description"],
                    },
                ],
            };
            if (lesson) {
                filter.order = [
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "order", "ASC"],
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "createdAt", "ASC"],
                ];
                filter.include.push({
                    model: lesson_model_1.Lesson,
                    as: "lessons",
                });
            }
            const result = yield index_service_1.CourseService.fetchCourses((0, common_1.paginate)(filter, {
                page: Number(page) || 1,
                pageSize: Number(pageSize) || 9,
            }));
            const mapped_result = yield (0, common_1.mapCourseImage)(result);
            return res.json(mapped_result);
        }
        catch (error) {
            next(error);
        }
    }),
    getCoursesInfo: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page, pageSize } = req.query;
            const filter = {
                attributes: ["id", "title", "description", "image"],
                order: [
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "order", "ASC"],
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "createdAt", "ASC"],
                    [
                        { model: lesson_model_1.Lesson, as: "lessons" },
                        { model: exercise_model_1.Exercise, as: "exercises" },
                        "order",
                        "ASC",
                    ],
                    [
                        { model: lesson_model_1.Lesson, as: "lessons" },
                        { model: exercise_model_1.Exercise, as: "exercises" },
                        "createdAt",
                        "ASC",
                    ],
                ],
                include: [
                    {
                        model: lesson_model_1.Lesson,
                        attributes: ["id", "title"],
                        include: [
                            {
                                model: exercise_model_1.Exercise,
                                attributes: ["id", "title"],
                            },
                        ],
                    },
                    {
                        model: course_model_1.Course,
                        as: "prereq",
                        through: {
                            attributes: [],
                        },
                        attributes: ["id", "title", "description"],
                    },
                ],
            };
            const result = yield index_service_1.CourseService.fetchCourses((0, common_1.paginate)(filter, {
                page: Number(page) || 1,
                pageSize: Number(pageSize) || 9,
            }));
            const mapped_result = yield (0, common_1.mapCourseImage)(result);
            return res.json(mapped_result);
        }
        catch (error) {
            next(error);
        }
    }),
    updateCourse: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const { id } = req.params;
                const param = req.body;
                const filter = {
                    where: {
                        id,
                    },
                    transaction: t,
                    returning: true,
                };
                const { error } = course_validation_1.updateCourseSchema.validate(Object.assign({ id }, param));
                if (error) {
                    (0, handleError_1.handleError)(error.message, 403);
                }
                let cover_url;
                const course = yield index_service_1.CourseService.fetchCourse(filter);
                if (!course) {
                    return (0, handleError_1.handleError)("course not found", 404);
                }
                let key = course.image;
                if (req.file) {
                    key = yield (0, file_1.saveImage)(req.file, config_1.default.AWS_COURSE_FOLDER);
                    course.image && (yield (0, file_1.removeImage)(course.image));
                    param.image = key;
                }
                if (key) {
                    cover_url = yield (0, file_1.getImage)(key);
                }
                yield index_service_1.CourseService.editCourse(param, filter);
                if (param.prerequisiteIds && ((_a = param === null || param === void 0 ? void 0 : param.prerequisiteIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    const prerequisite_info = param.prerequisiteIds.map((id) => ({
                        requisiteId: course.id,
                        prereqId: id,
                    }));
                    yield index_service_1.CourseService.removePrerequisite({
                        where: { requisiteId: course.id },
                        transaction: t,
                    });
                    yield index_service_1.CourseService.insertBulkPrerequisite(prerequisite_info, {
                        transaction: t,
                    });
                }
                yield course.reload({ transaction: t });
                course.dataValues.cover_url = cover_url;
                return res.status(201).json(course);
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    getCourse: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { lesson } = req.query;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id },
                include: [
                    {
                        model: course_model_1.Course,
                        as: "prereq",
                        through: {
                            attributes: [],
                        },
                        attributes: ["id", "title", "description"],
                    },
                ],
            };
            if (lesson) {
                filter.order = [
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "order", "ASC"],
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "createdAt", "ASC"],
                ];
                filter.include.push({
                    model: lesson_model_1.Lesson,
                });
            }
            const result = yield index_service_1.CourseService.fetchCourse(filter);
            if (!result)
                return res.json(result);
            const [mapped_result] = yield (0, common_1.mapCourseImage)([result]);
            return res.json(mapped_result);
        }
        catch (error) {
            next(error);
        }
    }),
    getCourseInfo: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id },
                attributes: ["id", "title", "description", "image"],
                order: [
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "order", "ASC"],
                    [{ model: lesson_model_1.Lesson, as: "lessons" }, "createdAt", "ASC"],
                    [
                        { model: lesson_model_1.Lesson, as: "lessons" },
                        { model: exercise_model_1.Exercise, as: "exercises" },
                        "order",
                        "ASC",
                    ],
                    [
                        { model: lesson_model_1.Lesson, as: "lessons" },
                        { model: exercise_model_1.Exercise, as: "exercises" },
                        "createdAt",
                        "ASC",
                    ],
                ],
                include: [
                    {
                        model: lesson_model_1.Lesson,
                        attributes: ["id", "title"],
                        include: [
                            {
                                model: exercise_model_1.Exercise,
                                attributes: ["id", "title"],
                            },
                        ],
                    },
                    {
                        model: course_model_1.Course,
                        as: "prereq",
                        through: {
                            attributes: [],
                        },
                        attributes: ["id", "title", "description"],
                    },
                ],
            };
            const result = yield index_service_1.CourseService.fetchCourse(filter);
            if (!result) {
                return (0, handleError_1.handleError)("course not found", 404);
            }
            const [mapped_result] = yield (0, common_1.mapCourseImage)([result]);
            return res.json(mapped_result);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteCourse: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: {
                    id,
                },
            };
            const result = yield index_service_1.CourseService.removeCourse(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=course.controller.js.map