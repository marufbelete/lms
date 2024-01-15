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
exports.StepValidation = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const exercise_model_1 = require("./exercise.model");
let StepValidation = class StepValidation extends sequelize_typescript_1.Model {
};
exports.StepValidation = StepValidation;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], StepValidation.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], StepValidation.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], StepValidation.prototype, "input", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StepValidation.prototype, "error_message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StepValidation.prototype, "success_message", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => exercise_model_1.Exercise),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StepValidation.prototype, "exerciseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => exercise_model_1.Exercise),
    __metadata("design:type", exercise_model_1.Exercise)
], StepValidation.prototype, "exercise", void 0);
exports.StepValidation = StepValidation = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.STEP_VALIDATION,
        modelName: 'step_validation',
        createdAt: "created_at",
        updatedAt: "updated_at"
    })
], StepValidation);
//# sourceMappingURL=step_validation.model.js.map