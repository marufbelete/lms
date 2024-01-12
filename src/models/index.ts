import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { User } from './user.model';
import { Role } from './role.model';
import { User_Role } from './user_role.model';
import { Lesson } from './lesson.model';
import { Lesson_User } from './lesson_user.model';
import { Prerequisite } from './prerequisite.model';
import { Course } from './course.model';
import { Course_User } from './course_user.model';
import { Collection } from './collection.model';
import { Collection_User } from './collection_user';
import { StepValidation } from './step_validation.model';
import { Exercise } from './exercise.model';
import { Exercise_User } from './exercise_user.model';

const sequelize =config.DB_URL?
  new Sequelize(config.DB_URL,{
  logging:true,
  pool:{
    max: 20,
    min: 0,
    idle: 10000,
    acquire:1000
  },
  models: [User,Role,User_Role,Lesson,
  Lesson_User,Prerequisite,Course,Exercise,
  Course_User,Collection,Collection_User,
  StepValidation,Exercise_User]})
 :new Sequelize({
  database: config.DB_NAME,
  dialect: config.DB_DIALECT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  logging:true,
  models: [User,Role,User_Role,Lesson,
    Lesson_User,Prerequisite,Course,Exercise,
    Course_User,Collection,Collection_User,
    StepValidation,Exercise_User],
  pool:{
    max: 20,
    min: 0,
    idle: 10000,
    acquire:1000
  }
});

export default sequelize;

