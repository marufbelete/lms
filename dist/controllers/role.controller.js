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
const handleError_1 = require("../helpers/handleError");
const index_service_1 = require("../service/index.service");
const common_validation_1 = require("../validation/common.validation");
const role_validation_1 = require("../validation/role.validation");
exports.default = {
    addRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const param = req.body;
            const { error } = role_validation_1.addRoleSchema.validate(param);
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = yield index_service_1.RoleService.insertRole(param);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    getRoles: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield index_service_1.RoleService.fetchRoles();
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    updateRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const param = req.body;
            const filter = {
                where: {
                    id
                }
            };
            const { error } = role_validation_1.updateRoleSchema.validate(Object.assign({ id }, param));
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = yield index_service_1.RoleService.editRole(param, filter);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    getRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id }
            };
            const result = yield index_service_1.RoleService.fetchRole(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: {
                    id
                }
            };
            const result = yield index_service_1.RoleService.removeRole(filter);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    })
};
//# sourceMappingURL=role.controller.js.map