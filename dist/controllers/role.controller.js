"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = require("../helpers/handleError");
const index_service_1 = require("../service/index.service");
const common_validation_1 = require("../validation/common.validation");
const role_validation_1 = require("../validation/role.validation");
exports.default = {
    addRole: async (req, res, next) => {
        try {
            const param = req.body;
            const { error } = role_validation_1.addRoleSchema.validate(param);
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = await index_service_1.RoleService.insertRole(param);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    getRoles: async (req, res, next) => {
        try {
            const result = await index_service_1.RoleService.fetchRoles();
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    },
    updateRole: async (req, res, next) => {
        try {
            const { id } = req.params;
            const param = req.body;
            const filter = {
                where: {
                    id,
                },
            };
            const { error } = role_validation_1.updateRoleSchema.validate({
                id,
                ...param,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = await index_service_1.RoleService.editRole(param, filter);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    getRole: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id },
            };
            const result = await index_service_1.RoleService.fetchRole(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    },
    deleteRole: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: {
                    id,
                },
            };
            const result = await index_service_1.RoleService.removeRole(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    },
};
