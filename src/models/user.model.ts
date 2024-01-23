import { TABLE } from "../constant/table";
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
  Scopes,
} from "sequelize-typescript";
import { User_Role } from "./user_role.model";
import { Role } from "./role.model";
import { IUser, PersonCreationAttributes } from "../types";
import { Course_User } from "./course_user.model";
import { Lesson } from "./lesson.model";
import { Lesson_User } from "./lesson_user.model";
import { Course } from "./course.model";
import { Exercise_User } from "./exercise_user.model";
import { Exercise } from "./exercise.model";
import { Collection } from "./collection.model";
import { Collection_User } from "./collection_user";

@Scopes(() => ({
  user_role_state: {
    include: [
      {
        model: Role,
        through: { attributes: ["is_active"] },
      },
    ],
  },

  local_auth_user: {
    where: {
      is_local_auth: true,
    },
  },
}))
@Table({
  tableName: TABLE.USER,
  modelName: "user",
})
export class User extends Model<IUser, PersonCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  first_name: string | null;

  @Column({
    type: DataType.STRING,
  })
  last_name: string | null;

  @Column({
    type: DataType.STRING,
    unique: {
      name: "email",
      msg: "email alrady taken",
    },
  })
  email: string | null;

  @Column({
    type: DataType.STRING,
    unique: {
      name: "username",
      msg: "username already taken.",
    },
  })
  username: string | null;

  @Column({
    type: DataType.STRING,
  })
  subscribed_to_newsletter: boolean;

  @Column({
    type: DataType.STRING,
  })
  avatar: string | null;

  @Column({
    type: DataType.STRING,
  })
  password: string | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_email_confirmed: boolean;

  @Column({
    type: DataType.STRING,
  })
  google_id: string | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_local_auth: boolean;

  @BelongsToMany(() => Role, () => User_Role)
  roles?: Array<Role & { user_role: User_Role }>;

  @HasMany(() => User_Role)
  user_roles?: User_Role[];

  @BelongsToMany(() => Course, () => Course_User)
  courses?: Array<Course & { course_user: Course_User }>;

  @HasMany(() => Course_User)
  course_users?: Course_User[];

  @BelongsToMany(() => Lesson, () => Lesson_User)
  lessons?: Array<Lesson & { lesson_user: Lesson_User }>;

  @HasMany(() => Lesson_User)
  lesson_users?: Lesson_User[];

  @BelongsToMany(() => Exercise, () => Exercise_User)
  exercises?: Array<Exercise & { exercise_user: Exercise_User }>;

  @HasMany(() => Exercise_User)
  exercise_users?: Exercise_User[];

  @BelongsToMany(() => Collection, () => Collection_User)
  collections?: Array<Collection & { collection_user: Collection_User }>;

  @HasMany(() => Collection_User)
  collection_users?: Collection_User[];
}
