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
exports.RoleService = void 0;
const role_model_1 = require("../models/role.model");
class RoleService {
    static insertRole({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_role = new role_model_1.Role({ name });
            const result = yield new_role.save();
            return result;
        });
    }
    static fetchRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield role_model_1.Role.findAll();
            return result;
        });
    }
    static fetchRole(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield role_model_1.Role.findOne(filter);
            return result;
        });
    }
    static editRole(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield role_model_1.Role.update(param, filter);
            return result;
        });
    }
    static removeRole(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield role_model_1.Role.destroy(filter);
            return result;
        });
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map