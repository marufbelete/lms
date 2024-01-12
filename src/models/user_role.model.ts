import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";
import { Role } from "./role.model";


@Table({
  tableName: TABLE.USER_ROLE,
  modelName:'user_role'
})
export class User_Role extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:true
  })
  is_active: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId?:string;


  @BelongsTo(() => User)
  user?:User;

  @BelongsTo(() => Role)
  role?:Role;

}