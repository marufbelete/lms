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
exports.paginate = exports.mapCourseCompleted = exports.mapCollectionCourseImage = exports.mapCourseImage = exports.mapCourseUserInfo = exports.exerciseMaxWeightUpdateFilter = exports.exerciseMaxWeightFilter = exports.lessonMaxWeightUpdateFilter = exports.lessonMaxWeightFilter = exports.mapUserExerciseInfo = exports.isAllCompleted = exports.calculateCompletedExerciseWeight = void 0;
const sequelize_1 = require("sequelize");
const file_1 = require("./file");
const handleError_1 = require("./handleError");
const calculateCompletedExerciseWeight = (data) => {
    var _a;
    let totalWeight = 0;
    (_a = data.lesson_users) === null || _a === void 0 ? void 0 : _a.forEach((lessonUser) => {
        var _a;
        (_a = lessonUser.exercise_users) === null || _a === void 0 ? void 0 : _a.forEach((exerciseUser) => {
            if (exerciseUser.is_completed && exerciseUser.exercise) {
                totalWeight += exerciseUser.exercise.weight;
            }
        });
    });
    return totalWeight;
};
exports.calculateCompletedExerciseWeight = calculateCompletedExerciseWeight;
const isAllCompleted = (arr) => {
    const allCompleted = arr === null || arr === void 0 ? void 0 : arr.every((exercise) => exercise.is_completed === true);
    return allCompleted;
};
exports.isAllCompleted = isAllCompleted;
const mapUserExerciseInfo = (exercise_info) => {
    const maped_data = exercise_info.map((item) => {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            weight: item.weight,
            instruction: item.instruction,
            order: item.order,
            is_completed: item.exercise_users[0].is_completed,
            step_validation: item.step_validation,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    });
    return maped_data;
};
exports.mapUserExerciseInfo = mapUserExerciseInfo;
const lessonMaxWeightFilter = (course_id) => {
    const filter = {
        where: {
            courseId: course_id
        }
    };
    return filter;
};
exports.lessonMaxWeightFilter = lessonMaxWeightFilter;
const lessonMaxWeightUpdateFilter = (course_id, lesson_id) => {
    const filter = {
        where: {
            id: {
                [sequelize_1.Op.ne]: lesson_id
            },
            courseId: course_id
        }
    };
    return filter;
};
exports.lessonMaxWeightUpdateFilter = lessonMaxWeightUpdateFilter;
const exerciseMaxWeightFilter = (lesson_id) => {
    const filter = {
        where: {
            lessonId: lesson_id
        }
    };
    return filter;
};
exports.exerciseMaxWeightFilter = exerciseMaxWeightFilter;
const exerciseMaxWeightUpdateFilter = (exercise_id, lesson_id) => {
    const filter = {
        where: {
            id: {
                [sequelize_1.Op.ne]: exercise_id
            },
            lessonId: lesson_id
        }
    };
    return filter;
};
exports.exerciseMaxWeightUpdateFilter = exerciseMaxWeightUpdateFilter;
const mapCourseUserInfo = (inputData) => {
    const transformedData = inputData === null || inputData === void 0 ? void 0 : inputData.map((data) => {
        var _a, _b, _c, _d, _e;
        const completedLessons = (_a = data.lesson_users) === null || _a === void 0 ? void 0 : _a.reduce((total, lessonUser) => {
            if (lessonUser.dataValues.is_completed) {
                return total + 1;
            }
            return total;
        }, 0);
        const lessons = (_b = data.lesson_users) === null || _b === void 0 ? void 0 : _b.map((lessonUser) => {
            var _a, _b, _c, _d;
            const completedExercises = (_a = lessonUser.exercise_users) === null || _a === void 0 ? void 0 : _a.filter((exercise) => exercise.dataValues.is_completed);
            return {
                id: (_b = lessonUser.lesson) === null || _b === void 0 ? void 0 : _b.dataValues.id,
                title: (_c = lessonUser.lesson) === null || _c === void 0 ? void 0 : _c.dataValues.title,
                completed_exercises: completedExercises === null || completedExercises === void 0 ? void 0 : completedExercises.length,
                is_complete: lessonUser.dataValues.is_completed,
                exercises: (_d = lessonUser.exercise_users) === null || _d === void 0 ? void 0 : _d.map((exerciseUser) => {
                    var _a, _b;
                    return ({
                        id: (_a = exerciseUser.exercise) === null || _a === void 0 ? void 0 : _a.dataValues.id,
                        title: (_b = exerciseUser.exercise) === null || _b === void 0 ? void 0 : _b.dataValues.title,
                        completed: exerciseUser.dataValues.is_completed,
                    });
                }),
            };
        });
        return {
            id: (_c = data.course) === null || _c === void 0 ? void 0 : _c.dataValues.id,
            title: (_d = data.course) === null || _d === void 0 ? void 0 : _d.dataValues.title,
            description: (_e = data.course) === null || _e === void 0 ? void 0 : _e.dataValues.description,
            current_lesson_id: data.dataValues.currentLessonId,
            completed_lessons: completedLessons,
            lessons: lessons,
        };
    });
    return transformedData;
};
exports.mapCourseUserInfo = mapCourseUserInfo;
const mapCourseImage = (courses) => __awaiter(void 0, void 0, void 0, function* () {
    for (let course of courses) {
        if (course.image) {
            const url = yield (0, file_1.getImage)(course.image);
            course.dataValues.cover_url = url;
        }
    }
    return courses;
});
exports.mapCourseImage = mapCourseImage;
const mapCollectionCourseImage = (collections) => __awaiter(void 0, void 0, void 0, function* () {
    for (let collection of collections) {
        for (let course of collection.courses) {
            if (course.image) {
                const url = yield (0, file_1.getImage)(course.image);
                course.dataValues.cover_url = url;
            }
        }
    }
    return collections;
});
exports.mapCollectionCourseImage = mapCollectionCourseImage;
const mapCourseCompleted = (prereq) => {
    const mapped_course = prereq.map((course) => ({
        id: course.id,
        title: course === null || course === void 0 ? void 0 : course.title,
        description: course === null || course === void 0 ? void 0 : course.description,
        is_completed: course.course_users[0].is_completed || false
    }));
    return mapped_course;
};
exports.mapCourseCompleted = mapCourseCompleted;
const paginate = (filter, { page, pageSize }) => {
    if (page < 1) {
        (0, handleError_1.handleError)("page number should bee greater than or equal to 1", 400);
    }
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    return Object.assign(Object.assign({}, filter), { offset,
        limit });
};
exports.paginate = paginate;
//# sourceMappingURL=common.js.map