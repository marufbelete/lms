import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
HasMany,ForeignKey,
BelongsToMany,
BelongsTo} from "sequelize-typescript";
import { Exercise } from "./exercise.model";
import { Course } from "./course.model";
import { User } from "./user.model";
import { Lesson_User } from "./lesson_user.model";
import { Course_User } from "./course_user.model";
import { ILesson, LessonCreationAttributes } from "../types/lesson.interface";
    
    
@Table({
  tableName: TABLE.LESSON,
  modelName:'lesson'
})
export class Lesson extends Model<ILesson,LessonCreationAttributes> {
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
    type: DataType.INTEGER,
    allowNull: true
  })
  order: number;

  @ForeignKey(() => Course)
  @Column
  courseId:string;

  @BelongsToMany(()=> User,()=>Lesson_User)
  users?: Array<User & {lesson_user: Lesson_User}>;

  @HasMany(()=> Lesson_User)
  lesson_users?: Lesson_User[];

  @BelongsTo(()=> Course)
  course?: Course;
  
  @HasMany(()=> Course_User)
  course_users?: Course_User[];

  @HasMany(()=> Exercise)
  exercises?: Exercise[];

}
    
    