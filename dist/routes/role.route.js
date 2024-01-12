"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("../controllers/role.controller");
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const route = express_1.default.Router({ mergeParams: true });
route.post('/', role_controller_1.addRole, errohandling_middleware_1.errorHandler);
route.get('/', role_controller_1.getRoles, errohandling_middleware_1.errorHandler);
route.put('/:id', role_controller_1.updateRole, errohandling_middleware_1.errorHandler);
route.get('/:id', role_controller_1.getRole, errohandling_middleware_1.errorHandler);
route.delete('/:id', role_controller_1.deleteRole, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=role.route.js.map