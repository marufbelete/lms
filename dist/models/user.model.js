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
exports.User = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_role_model_1 = require("./user_role.model");
const role_model_1 = require("./role.model");
const course_user_model_1 = require("./course_user.model");
const lesson_model_1 = require("./lesson.model");
const lesson_user_model_1 = require("./lesson_user.model");
const course_model_1 = require("./course.model");
const exercise_user_model_1 = require("./exercise_user.model");
const exercise_model_1 = require("./exercise.model");
const collection_model_1 = require("./collection.model");
const collection_user_1 = require("./collection_user");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: {
            name: 'email',
            msg: "email alrady taken"
        },
    }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: {
            name: 'username',
            msg: "username already taken.",
        }
    }),
    __metadata("design:type", Object)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "subscribed_to_newsletter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "is_email_confirmed", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "google_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "is_local_auth", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => role_model_1.Role, () => user_role_model_1.User_Role),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_role_model_1.User_Role),
    __metadata("design:type", Array)
], User.prototype, "user_roles", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => course_model_1.Course, () => course_user_model_1.Course_User),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_user_model_1.Course_User),
    __metadata("design:type", Array)
], User.prototype, "course_users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => lesson_model_1.Lesson, () => lesson_user_model_1.Lesson_User),
    __metadata("design:type", Array)
], User.prototype, "lessons", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lesson_user_model_1.Lesson_User),
    __metadata("design:type", Array)
], User.prototype, "lesson_users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => exercise_model_1.Exercise, () => exercise_user_model_1.Exercise_User),
    __metadata("design:type", Array)
], User.prototype, "exercises", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exercise_user_model_1.Exercise_User),
    __metadata("design:type", Array)
], User.prototype, "exercise_users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => collection_model_1.Collection, () => collection_user_1.Collection_User),
    __metadata("design:type", Array)
], User.prototype, "collections", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => collection_user_1.Collection_User),
    __metadata("design:type", Array)
], User.prototype, "collection_users", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        user_role_state: {
            include: [{
                    model: role_model_1.Role,
                    through: { attributes: ['is_active'] }
                }]
        },
        local_auth_user: {
            where: {
                is_local_auth: true
            }
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.USER,
        modelName: 'user'
    })
], User);
//# sourceMappingURL=user.model.js.map