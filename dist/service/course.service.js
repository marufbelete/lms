"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const course_model_1 = require("../models/course.model");
const course_user_model_1 = require("../models/course_user.model");
const prerequisite_model_1 = require("../models/prerequisite.model");
class CourseService {
    static async insertCourse(param, transaction = {}) {
        const new_course = new course_model_1.Course({
            ...param,
        });
        const result = await new_course.save({ ...transaction });
        return result;
    }
    static async fetchCourses(filter) {
        const result = await course_model_1.Course.findAll(filter);
        return result;
    }
    static async fetchCourse(filter) {
        const result = await course_model_1.Course.findOne(filter);
        return result;
    }
    static async fetchCourse_User(filter) {
        const result = await course_user_model_1.Course_User.findOne(filter);
        return result;
    }
    static async editCourse(param, filter) {
        const result = await course_model_1.Course.update(param, filter);
        return result;
    }
    static async editCourseUser(param, filter) {
        const result = await course_user_model_1.Course_User.update(param, filter);
        return result;
    }
    static async removeCourse(filter) {
        const result = await course_model_1.Course.destroy(filter);
        return result;
    }
    static async currentLesson(userId, courseId) {
        const result = await course_user_model_1.Course_User.findOne({
            where: { userId, courseId },
        });
        return result;
    }
    static async insertBulkPrerequisite(param, transaction = {}) {
        const result = await prerequisite_model_1.Prerequisite.bulkCreate(param, { ...transaction });
        return result;
    }
    static async editPrerequisite(param, filter) {
        const result = await prerequisite_model_1.Prerequisite.update(param, filter);
        return result;
    }
    static async removePrerequisite(filter) {
        const result = await prerequisite_model_1.Prerequisite.destroy(filter);
        return result;
    }
    static async coursePrerequisiteNotCompleted(course_id, user_id) {
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
        return await this.fetchCourse(filter);
    }
}
exports.CourseService = CourseService;
