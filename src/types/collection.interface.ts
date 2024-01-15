import { Optional } from "sequelize";

export interface IBaseCollection{
    id: string;
    title:string;
    description?:string;

}

export interface ICollection extends IBaseCollection{}


export interface CollectionCreationAttributes extends 
Optional<ICollection, 'id'|'description'>{};


