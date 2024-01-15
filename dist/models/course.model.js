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
exports.Course = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const course_user_model_1 = require("./course_user.model");
const lesson_model_1 = require("./lesson.model");
const collection_model_1 = require("./collection.model");
const prerequisite_model_1 = require("./prerequisite.model");
let Course = class Course extends sequelize_typescript_1.Model {
};
exports.Course = Course;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], Course.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Course.prototype, "estimatedTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('easy', 'medium', 'difficult'),
        validate: {
            isIn: {
                args: [['easy', 'medium', 'difficult']],
                msg: "Invalid difficulty."
            }
        },
    }),
    __metadata("design:type", String)
], Course.prototype, "difficulty", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => collection_model_1.Collection),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Course.prototype, "collectionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => course_user_model_1.Course_User),
    __metadata("design:type", Array)
], Course.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_user_model_1.Course_User),
    __metadata("design:type", Array)
], Course.prototype, "course_users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lesson_model_1.Lesson),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Course, () => prerequisite_model_1.Prerequisite, 'requisiteId', 'prereqId'),
    __metadata("design:type", Array)
], Course.prototype, "prereq", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Course, () => prerequisite_model_1.Prerequisite, 'prereqId', 'requisiteId'),
    __metadata("design:type", Array)
], Course.prototype, "requisite", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => collection_model_1.Collection),
    __metadata("design:type", collection_model_1.Collection)
], Course.prototype, "collection", void 0);
exports.Course = Course = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.COURSE,
        modelName: 'course'
    })
], Course);
//# sourceMappingURL=course.model.js.map