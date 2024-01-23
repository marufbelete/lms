import { Optional } from "sequelize";

export interface IBaseCourse {
  id: string;
  title: string;
  description?: string;
  image?: string | null;
  estimatedTime?: string;
  difficulty?: string;
  prerequisiteIds?: string[];
  collectionId?: string;
}

export interface ICourse extends IBaseCourse {
  cover_url?: string;
  progress?: number; // Assuming progress is a number, adjust the type accordingly
  current_lesson_id?: string;
}

export interface CourseCreationAttributes
  extends Optional<
    ICourse,
    | "id"
    | "description"
    | "image"
    | "estimatedTime"
    | "difficulty"
    | "collectionId"
    | "prerequisiteIds"
  > {}

// export interface UserResponse extends Partial<IBaseCourse>{

// }
