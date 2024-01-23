import { TABLE } from "../constant/table";
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Course } from "./course.model";
import { Lesson } from "./lesson.model";
import { Lesson_User } from "./lesson_user.model";

@Table({
  tableName: TABLE.COURSE_USER,
  modelName: "course_user",
})
export class Course_User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_started: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_completed: boolean;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Course)
  @Column
  courseId: string;

  @ForeignKey(() => Lesson)
  @Column
  currentLessonId: string;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Course)
  course?: Course;

  @BelongsTo(() => Lesson)
  lesson?: Lesson;

  @HasMany(() => Lesson_User)
  lesson_users?: Lesson_User[];
}
