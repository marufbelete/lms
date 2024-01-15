import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
BelongsTo,ForeignKey} from "sequelize-typescript";
import { Exercise } from "./exercise.model";


@Table({
  tableName: TABLE.STEP_VALIDATION,
  modelName:'step_validation',
  createdAt: "created_at", 
  updatedAt: "updated_at"
})
export class StepValidation extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
   
  })
  type: string;

  @Column({
type: DataType.TEXT,
    allowNull: false,
   
  })
  input: string;

  @Column({
    type: DataType.STRING,
   
  })
  error_message: string;

  @Column({
    type: DataType.STRING,
   
  })
  success_message: string;

  @ForeignKey(() => Exercise)
  @Column
  exerciseId:string;


  @BelongsTo(() => Exercise)
  exercise?: Exercise;

}

