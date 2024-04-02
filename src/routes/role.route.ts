import express from "express";
import RoleController from "../controllers/role.controller";
const route = express.Router({ mergeParams: true });

route.post("/", RoleController.addRole);
route.get("/", RoleController.getRoles);
route.put("/:id", RoleController.updateRole);
route.get("/:id", RoleController.getRole);
route.delete("/:id", RoleController.deleteRole);

export default route;
