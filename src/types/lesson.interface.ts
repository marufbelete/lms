import { Optional } from "sequelize";

export interface IBaseLesson{
    id: string;
    title:string;
    description?:string;
    order:string;
    weight:string;
    course_id:string;
}

export interface ILesson extends IBaseLesson{}


export interface LessonCreationAttributes extends 
Optional<ILesson, 'id'|'description'>{};

// export interface UserResponse extends Partial<IBaseCourse>{
  
// }
