import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
HasMany,ForeignKey,
BelongsToMany,BelongsTo,
HasOne} from "sequelize-typescript";
import { StepValidation } from "./step_validation.model";
import { Lesson } from "./lesson.model";
import { Exercise_User } from "./exercise_user.model";
import { User } from "./user.model";
import { ExerciseCreationAttributes, IExercise } from "../types/exercise.interface";
    
    
@Table({
  tableName: TABLE.EXERCISE,
  modelName:'exercise'
})
export class Exercise extends Model<IExercise,ExerciseCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
    
  })
  title: string;

  @Column({
    type: DataType.STRING       
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weight: number;

  @Column({
    type: DataType.STRING,
    
  })
  instruction: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
    
  })
  order: number;

  @ForeignKey(() => Lesson)
  @Column
  lessonId:string;


  @HasOne(()=> StepValidation)
  step_validation?: StepValidation;

  @BelongsToMany(()=> User,()=>Exercise_User)
  users?: Array<User & {exercise_user: Exercise_User}>;

  @HasMany(()=> Exercise_User)
  exercise_users?: Exercise_User[];

  @BelongsTo(()=> Lesson)
  lesson?: Lesson;

}
    
    