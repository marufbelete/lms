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
exports.Prerequisite = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const course_model_1 = require("./course.model");
let Prerequisite = class Prerequisite extends sequelize_typescript_1.Model {
};
exports.Prerequisite = Prerequisite;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Prerequisite.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_model_1.Course),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Prerequisite.prototype, "requisiteId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_model_1.Course),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Prerequisite.prototype, "prereqId", void 0);
exports.Prerequisite = Prerequisite = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.PREREQUISITE,
        modelName: 'prerequisite',
    })
], Prerequisite);
//# sourceMappingURL=prerequisite.model.js.map