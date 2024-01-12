"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.addRoleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const addRoleSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
});
exports.addRoleSchema = addRoleSchema;
const updateRoleSchema = joi_1.default.object({
    id: joi_1.default.any().required(),
    name: joi_1.default.string().required()
});
exports.updateRoleSchema = updateRoleSchema;
//# sourceMappingURL=role.validation.js.map