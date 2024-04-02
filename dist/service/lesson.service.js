"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const common_1 = require("../constant/common");
const lesson_model_1 = require("../models/lesson.model");
const sequelize_1 = require("sequelize");
const lesson_user_model_1 = require("../models/lesson_user.model");
class LessonService {
    static async insertLesson(param, t = {}) {
        const new_Lesson = new lesson_model_1.Lesson(param);
        const result = await new_Lesson.save(t);
        return result;
    }
    static async fetchLessons(filter) {
        const result = await lesson_model_1.Lesson.findAll(filter);
        return result;
    }
    static async fetchLesson(filter) {
        const result = await lesson_model_1.Lesson.findOne(filter);
        return result;
    }
    static async editLesson(param, filter) {
        const result = await lesson_model_1.Lesson.update(param, filter);
        return result;
    }
    static async removeLesson(filter) {
        const result = await lesson_model_1.Lesson.destroy(filter);
        return result;
    }
    static async fetchLessonUser(userId, lessonId) {
        const result = await lesson_user_model_1.Lesson_User.findOne({ where: { lessonId, userId } });
        return result;
    }
    //update in future
    static async getLessonMaxWeightToAssign(filter) {
        const result = await lesson_model_1.Lesson.sum("weight", filter);
        return common_1.WEIGHT.MAX - result;
    }
    static async getNextLeastOrderLesson(course_id, order_value) {
        const leastOrderLesson = await this.fetchLesson({
            where: {
                courseId: course_id,
                order: { [sequelize_1.Op.gt]: order_value },
            },
            order: [["order", "ASC"]],
        });
        return leastOrderLesson;
    }
    static async editLessonUser(param, filter) {
        const result = await lesson_user_model_1.Lesson_User.update(param, filter);
        return result;
    }
}
exports.LessonService = LessonService;
