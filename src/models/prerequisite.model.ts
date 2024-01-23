import { TABLE } from "../constant/table";
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { StepValidation } from "./step_validation.model";
import { Course } from "./course.model";

@Table({
  tableName: TABLE.PREREQUISITE,
  modelName: "prerequisite",
})
export class Prerequisite extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Course)
  @Column
  requisiteId: string;

  @ForeignKey(() => Course)
  @Column
  prereqId: string;
}
