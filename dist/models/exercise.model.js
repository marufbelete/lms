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
exports.Exercise = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const step_validation_model_1 = require("./step_validation.model");
const lesson_model_1 = require("./lesson.model");
const exercise_user_model_1 = require("./exercise_user.model");
const user_model_1 = require("./user.model");
let Exercise = class Exercise extends sequelize_typescript_1.Model {
};
exports.Exercise = Exercise;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Exercise.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], Exercise.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Exercise.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "instruction", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Exercise.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lesson_model_1.Lesson),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Exercise.prototype, "lessonId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => step_validation_model_1.StepValidation),
    __metadata("design:type", step_validation_model_1.StepValidation)
], Exercise.prototype, "step_validation", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => exercise_user_model_1.Exercise_User),
    __metadata("design:type", Array)
], Exercise.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exercise_user_model_1.Exercise_User),
    __metadata("design:type", Array)
], Exercise.prototype, "exercise_users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lesson_model_1.Lesson),
    __metadata("design:type", lesson_model_1.Lesson)
], Exercise.prototype, "lesson", void 0);
exports.Exercise = Exercise = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.EXERCISE,
        modelName: 'exercise'
    })
], Exercise);
//# sourceMappingURL=exercise.model.js.map