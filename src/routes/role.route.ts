import express from "express";
import RoleController from "../controllers/role.controller";
import { errorHandler } from "../middleware/errohandling.middleware";
const route = express.Router({ mergeParams: true });

route.post("/", RoleController.addRole, errorHandler);
route.get("/", RoleController.getRoles, errorHandler);
route.put("/:id", RoleController.updateRole, errorHandler);
route.get("/:id", RoleController.getRole, errorHandler);
route.delete("/:id", RoleController.deleteRole, errorHandler);

export default route;
