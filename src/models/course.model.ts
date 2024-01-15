import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
HasMany,ForeignKey,
BelongsToMany,BelongsTo} from "sequelize-typescript";
import { User } from "./user.model";
import { Course_User } from "./course_user.model";
import { Lesson } from "./lesson.model";
import { Collection } from "./collection.model";
import { Prerequisite } from "./prerequisite.model";
import { CourseCreationAttributes, ICourse } from "../types/course.interface";
    
    
@Table({
  tableName: TABLE.COURSE,
  modelName:'course'
})
export class Course extends Model<ICourse,CourseCreationAttributes> {
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
    type: DataType.STRING,
  })
  image: string|null;

  @Column({
    type: DataType.STRING,
  })
  estimatedTime: string;

  @Column({
    type: DataType.ENUM('easy','medium','difficult'),
    validate: {
      isIn:{
        args: [['easy','medium','difficult']],
        msg: "Invalid difficulty."
      }
    },
    
  })
  difficulty: string;

  @ForeignKey(() => Collection)
  @Column
  collectionId:string;


  @BelongsToMany(()=> User,()=>Course_User)
  users?: Array<User & {course_user: Course_User}>;

  @HasMany(()=> Course_User)
  course_users?: Course_User[];

  @HasMany(()=> Lesson)
  lessons!: Lesson[];

  @BelongsToMany(() => Course, () => Prerequisite, 'requisiteId', 'prereqId')
  prereq?: Course[];

  @BelongsToMany(() => Course, () => Prerequisite, 'prereqId', 'requisiteId')
  requisite?: Course[];

  @BelongsTo(()=> Collection)
  collection?: Collection;

}
    
    