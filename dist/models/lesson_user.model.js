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
exports.Lesson_User = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const lesson_model_1 = require("./lesson.model");
const exercise_user_model_1 = require("./exercise_user.model");
const course_user_model_1 = require("./course_user.model");
let Lesson_User = class Lesson_User extends sequelize_typescript_1.Model {
};
exports.Lesson_User = Lesson_User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lesson_User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Lesson_User.prototype, "is_started", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Lesson_User.prototype, "is_completed", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lesson_model_1.Lesson),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Lesson_User.prototype, "lessonId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Lesson_User.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_user_model_1.Course_User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Lesson_User.prototype, "courseUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Lesson_User.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lesson_model_1.Lesson),
    __metadata("design:type", lesson_model_1.Lesson)
], Lesson_User.prototype, "lesson", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_user_model_1.Course_User),
    __metadata("design:type", course_user_model_1.Course_User)
], Lesson_User.prototype, "course_user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exercise_user_model_1.Exercise_User),
    __metadata("design:type", Array)
], Lesson_User.prototype, "exercise_users", void 0);
exports.Lesson_User = Lesson_User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.LESSON_USER,
        modelName: "lesson_user",
    })
], Lesson_User);
//# sourceMappingURL=lesson_user.model.js.map