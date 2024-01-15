import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
BelongsTo,ForeignKey} from "sequelize-typescript";
import { User } from "./user.model";
import { Exercise } from "./exercise.model";
import { Lesson_User } from "./lesson_user.model";
    
    
@Table({
  tableName: TABLE.EXERCISE_USER,
  modelName:'exercise_user'
})
export class Exercise_User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false
    
  })
  is_completed: boolean;


  @ForeignKey(() => User)
  @Column
  userId:string;

  @ForeignKey(() => Lesson_User)
  @Column
  lessonUserId:string;

  @ForeignKey(() => Exercise)
  @Column
  exerciseId:string;


  @BelongsTo(()=> Exercise)
  exercise?: Exercise;

  @BelongsTo(()=> Lesson_User)
  lesson_user?: Lesson_User;

  @BelongsTo(()=> User)
  user?: User;

}
    
    