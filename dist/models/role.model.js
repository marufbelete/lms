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
exports.Role = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const user_role_model_1 = require("./user_role.model");
let Role = class Role extends sequelize_typescript_1.Model {
};
exports.Role = Role;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('admin', 'student'),
        unique: true,
        defaultValue: 'student',
        validate: {
            isUnique(value) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const existingRole = yield Role.findOne({ where: { name: value } });
                        if (existingRole) {
                            throw new Error("Role name is already in exist.");
                        }
                    }
                    catch (err) {
                        throw new Error(err.message);
                    }
                });
            },
            customValidator(value) {
                if (value === null && this.age !== 10) {
                    throw new Error("name can't be null unless age is 10");
                }
            }
        }
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => user_role_model_1.User_Role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_role_model_1.User_Role),
    __metadata("design:type", Array)
], Role.prototype, "user_roles", void 0);
exports.Role = Role = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.ROLE,
        modelName: 'role'
    })
    //may need for internal validation Interfae
], Role);
//# sourceMappingURL=role.model.js.map