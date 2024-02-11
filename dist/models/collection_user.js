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
exports.Collection_User = void 0;
const table_1 = require("../constant/table");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const collection_model_1 = require("./collection.model");
let Collection_User = class Collection_User extends sequelize_typescript_1.Model {
};
exports.Collection_User = Collection_User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Collection_User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", String)
], Collection_User.prototype, "is_started", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", String)
], Collection_User.prototype, "is_completed", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Collection_User.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => collection_model_1.Collection),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Collection_User.prototype, "collectionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Collection_User.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => collection_model_1.Collection),
    __metadata("design:type", collection_model_1.Collection)
], Collection_User.prototype, "collection", void 0);
exports.Collection_User = Collection_User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: table_1.TABLE.COLLECTION_USER,
        modelName: "collection_user",
    })
], Collection_User);
//# sourceMappingURL=collection_user.js.map