import { TABLE } from "../constant/table";
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "./user.model";
import { User_Role } from "./user_role.model";
import { IRole, RoleCreationAttributes } from "../types/role.interface";

@Table({
  tableName: TABLE.ROLE,
  modelName: "role",
})
//may need for internal validation Interfae
export class Role extends Model<IRole, RoleCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.ENUM("admin", "student"),
    unique: true,
    defaultValue: "student",
    validate: {
      async isUnique(value: "admin" | "student") {
        try {
          const existingRole = await Role.findOne({ where: { name: value } });
          if (existingRole) {
            throw new Error("Role name is already in exist.");
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
      customValidator(value: "admin" | "student") {
        if (value === null && this.age !== 10) {
          throw new Error("name can't be null unless age is 10");
        }
      },
    },
  })
  name: string;

  @BelongsToMany(() => User, () => User_Role)
  users?: Array<User & { user_role: User_Role }>;

  @HasMany(() => User_Role)
  user_roles?: User_Role[];
}
