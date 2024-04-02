"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const role_model_1 = require("../models/role.model");
class RoleService {
    static async insertRole({ name }) {
        const new_role = new role_model_1.Role({ name });
        const result = await new_role.save();
        return result;
    }
    static async fetchRoles() {
        const result = await role_model_1.Role.findAll();
        return result;
    }
    static async fetchRole(filter) {
        const result = await role_model_1.Role.findOne(filter);
        return result;
    }
    static async editRole(param, filter) {
        const result = await role_model_1.Role.update(param, filter);
        return result;
    }
    static async removeRole(filter) {
        const result = await role_model_1.Role.destroy(filter);
        return result;
    }
}
exports.RoleService = RoleService;
