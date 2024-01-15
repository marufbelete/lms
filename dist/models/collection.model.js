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
exports.Collection = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const course_model_1 = require("./course.model");
const user_model_1 = require("./user.model");
const collection_user_1 = require("./collection_user");
let Collection = class Collection extends sequelize_typescript_1.Model {
};
exports.Collection = Collection;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Collection.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Collection.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], Collection.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_model_1.Course),
    __metadata("design:type", Array)
], Collection.prototype, "courses", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => collection_user_1.Collection_User),
    __metadata("design:type", Array)
], Collection.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => collection_user_1.Collection_User),
    __metadata("design:type", Array)
], Collection.prototype, "collection_users", void 0);
exports.Collection = Collection = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.COLLECTION,
        modelName: 'collection',
    })
], Collection);
//# sourceMappingURL=collection.model.js.map