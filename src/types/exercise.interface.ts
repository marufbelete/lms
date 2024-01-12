import { Optional } from "sequelize";

export interface IBaseExercise{
    id: string;
    title:string;
    description?:string;
    lesson_id:string;
    instruction:string;
    stepValidation?:{
        type: string;
        input: string;
        error_message: string;
        success_message: string;
    }
    order:string;
    weight:string;

}

export interface IExercise extends IBaseExercise{}


export interface ExerciseCreationAttributes extends 
Optional<IExercise, 'id'|'description'|'stepValidation'|'instruction'>{};


