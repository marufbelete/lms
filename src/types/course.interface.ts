import { Optional } from "sequelize";

export interface IBaseCourse{
    id: string;
    title:string;
    description?:string;
    image?:string;
    estimatedTime?:string;
    difficulty?:boolean;
    prerequisiteIds?:string[];
    collectionId?:string;
}

export interface ICourse extends IBaseCourse{
    cover_url?:string;
}


export interface CourseCreationAttributes extends 
Optional<ICourse, 'id'|'description'
|'image'|'estimatedTime'|'difficulty'
|'collectionId'|'prerequisiteIds'>{};

// export interface UserResponse extends Partial<IBaseCourse>{
  
// }
