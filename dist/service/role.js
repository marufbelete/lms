"use strict";
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
exports.removeRole = exports.editRole = exports.fetchRole = exports.fetchRoles = exports.insertRole = void 0;
const role_model_1 = require("../models/role.model");
const insertRole = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const new_role = new role_model_1.Role(param);
    const result = yield new_role.save();
    return result;
});
exports.insertRole = insertRole;
const fetchRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.findAll();
    return result;
});
exports.fetchRoles = fetchRoles;
const fetchRole = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.findOne(filter);
    return result;
});
exports.fetchRole = fetchRole;
const editRole = (param, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.update(param, filter);
    return result;
});
exports.editRole = editRole;
const removeRole = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.destroy(filter);
    return result;
});
exports.removeRole = removeRole;
//# sourceMappingURL=role.js.map