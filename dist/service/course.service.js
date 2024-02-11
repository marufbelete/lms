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
exports.CourseService = void 0;
const course_model_1 = require("../models/course.model");
const course_user_model_1 = require("../models/course_user.model");
const prerequisite_model_1 = require("../models/prerequisite.model");
class CourseService {
    static insertCourse(param, transaction = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_course = new course_model_1.Course(Object.assign({}, param));
            const result = yield new_course.save(Object.assign({}, transaction));
            return result;
        });
    }
    static fetchCourses(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.Course.findAll(filter);
            return result;
        });
    }
    static fetchCourse(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.Course.findOne(filter);
            return result;
        });
    }
    static fetchCourse_User(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_user_model_1.Course_User.findOne(filter);
            return result;
        });
    }
    static editCourse(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.Course.update(param, filter);
            return result;
        });
    }
    static editCourseUser(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_user_model_1.Course_User.update(param, filter);
            return result;
        });
    }
    static removeCourse(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.Course.destroy(filter);
            return result;
        });
    }
    static currentLesson(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_user_model_1.Course_User.findOne({
                where: { userId, courseId },
            });
            return result;
        });
    }
    static insertBulkPrerequisite(param, transaction = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prerequisite_model_1.Prerequisite.bulkCreate(param, Object.assign({}, transaction));
            return result;
        });
    }
    static editPrerequisite(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prerequisite_model_1.Prerequisite.update(param, filter);
            return result;
        });
    }
    static removePrerequisite(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prerequisite_model_1.Prerequisite.destroy(filter);
            return result;
        });
    }
    static coursePrerequisiteNotCompleted(course_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {
                where: { id: course_id },
                // attributes:[],
                include: [
                    {
                        model: course_model_1.Course,
                        as: "prereq",
                        attributes: ["id", "title", "description"],
                        through: { attributes: [] },
                    },
                ],
            };
            return yield this.fetchCourse(filter);
        });
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map