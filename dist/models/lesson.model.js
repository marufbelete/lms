"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const exercise_model_1 = require("./exercise.model");
const course_model_1 = require("./course.model");
const user_model_1 = require("./user.model");
const lesson_user_model_1 = require("./lesson_user.model");
const course_user_model_1 = require("./course_user.model");
let Lesson = class Lesson extends sequelize_typescript_1.Model {
};
exports.Lesson = Lesson;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_model_1.Course),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Lesson.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => lesson_user_model_1.Lesson_User),
    __metadata("design:type", Array)
], Lesson.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lesson_user_model_1.Lesson_User),
    __metadata("design:type", Array)
], Lesson.prototype, "lesson_users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_model_1.Course),
    __metadata("design:type", course_model_1.Course)
], Lesson.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_user_model_1.Course_User),
    __metadata("design:type", Array)
], Lesson.prototype, "course_users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exercise_model_1.Exercise),
    __metadata("design:type", Array)
], Lesson.prototype, "exercises", void 0);
exports.Lesson = Lesson = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.LESSON,
        modelName: "lesson",
    })
], Lesson);
//# sourceMappingURL=lesson.model.js.map