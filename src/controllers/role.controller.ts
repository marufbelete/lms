import { IncludeOptions, UpdateOptions } from "sequelize";
import { handleError } from "../helpers/handleError";
import { RoleService } from "../service/index.service";
import { RoleCreationAttributes } from "../types/role.interface";
import { getByIdSchema } from "../validation/common.validation";
import { addRoleSchema, updateRoleSchema } from "../validation/role.validation";
import { Request, Response, NextFunction } from "express";

export default {
  addRole: async (
    req: Request<{}, {}, RoleCreationAttributes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const param = req.body;
      const { error } = addRoleSchema.validate(param);
      if (error) {
        handleError(error.message, 403);
      }
      const result = await RoleService.insertRole(param);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  getRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await RoleService.fetchRoles();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (
    req: Request<{ id: string }, {}, Partial<RoleCreationAttributes>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const param = req.body;
      const filter: UpdateOptions = {
        where: {
          id,
        },
      };

      const { error } = updateRoleSchema.validate({
        id,
        ...param,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const result = await RoleService.editRole(param, filter);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  getRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { error } = getByIdSchema.validate({ id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter: IncludeOptions = {
        where: { id },
      };
      const result = await RoleService.fetchRole(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { error } = getByIdSchema.validate({ id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter: IncludeOptions = {
        where: {
          id,
        },
      };
      const result = await RoleService.removeRole(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
