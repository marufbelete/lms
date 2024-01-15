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
exports.LessonService = void 0;
const common_1 = require("../constant/common");
const lesson_model_1 = require("../models/lesson.model");
const sequelize_1 = require("sequelize");
const lesson_user_model_1 = require("../models/lesson_user.model");
class LessonService {
    static insertLesson(param, t = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_Lesson = new lesson_model_1.Lesson(param);
            const result = yield new_Lesson.save(t);
            return result;
        });
    }
    static fetchLessons(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_model_1.Lesson.findAll(filter);
            return result;
        });
    }
    static fetchLesson(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_model_1.Lesson.findOne(filter);
            return result;
        });
    }
    static editLesson(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_model_1.Lesson.update(param, filter);
            return result;
        });
    }
    static removeLesson(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_model_1.Lesson.destroy(filter);
            return result;
        });
    }
    static fetchLessonUser(userId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_user_model_1.Lesson_User.findOne({ where: { lessonId, userId } });
            return result;
        });
    }
    //update in future
    static getLessonMaxWeightToAssign(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_model_1.Lesson.sum('weight', filter);
            return common_1.WEIGHT.MAX - result;
        });
    }
    static getNextLeastOrderLesson(course_id, order_value) {
        return __awaiter(this, void 0, void 0, function* () {
            const leastOrderLesson = yield this.fetchLesson({
                where: {
                    courseId: course_id,
                    order: { [sequelize_1.Op.gt]: order_value }
                },
                order: [['order', 'ASC']],
            });
            return leastOrderLesson;
        });
    }
    static editLessonUser(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield lesson_user_model_1.Lesson_User.update(param, filter);
            return result;
        });
    }
}
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map