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
exports.Exercise_User = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const exercise_model_1 = require("./exercise.model");
const lesson_user_model_1 = require("./lesson_user.model");
let Exercise_User = class Exercise_User extends sequelize_typescript_1.Model {
};
exports.Exercise_User = Exercise_User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Exercise_User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Exercise_User.prototype, "is_completed", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Exercise_User.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lesson_user_model_1.Lesson_User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Exercise_User.prototype, "lessonUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => exercise_model_1.Exercise),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Exercise_User.prototype, "exerciseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => exercise_model_1.Exercise),
    __metadata("design:type", exercise_model_1.Exercise)
], Exercise_User.prototype, "exercise", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lesson_user_model_1.Lesson_User),
    __metadata("design:type", lesson_user_model_1.Lesson_User)
], Exercise_User.prototype, "lesson_user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Exercise_User.prototype, "user", void 0);
exports.Exercise_User = Exercise_User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.EXERCISE_USER,
        modelName: "exercise_user",
    })
], Exercise_User);
