import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
HasMany,ForeignKey,
BelongsTo} from "sequelize-typescript";
import { StepValidation } from "./step_validation.model";
import { User } from "./user.model";
import { Lesson } from "./lesson.model";
import { Exercise_User } from "./exercise_user.model";
import { Course_User } from "./course_user.model";
    
    
@Table({
  tableName: TABLE.LESSON_USER,
  modelName:'lesson_user'
})
export class Lesson_User extends Model {
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
  is_started: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false     
  })
  is_completed: boolean;

  @ForeignKey(() => Lesson)
  @Column
  lessonId:string;

  @ForeignKey(() => User)
  @Column
  userId:string;
  
  @ForeignKey(() => Course_User)
  @Column
  courseUserId:string;


  @BelongsTo(()=> User)
  user?: User;

  @BelongsTo(()=> Lesson)
  lesson?: Lesson;

  @BelongsTo(()=> Course_User)
  course_user?: Course_User;

  @HasMany(()=> Exercise_User)
  exercise_users?: Exercise_User[];

}
    
    