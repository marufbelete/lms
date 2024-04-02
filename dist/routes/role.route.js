"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
const route = express_1.default.Router({ mergeParams: true });
route.post("/", role_controller_1.default.addRole);
route.get("/", role_controller_1.default.getRoles);
route.put("/:id", role_controller_1.default.updateRole);
route.get("/:id", role_controller_1.default.getRole);
route.delete("/:id", role_controller_1.default.deleteRole);
exports.default = route;
