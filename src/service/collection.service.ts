import { IncludeOptions, UpdateOptions } from "sequelize";
import { Collection } from "../models/collection.model";
import { CollectionCreationAttributes } from "../types";

export class CollectionService{
static async insertCollection(param:CollectionCreationAttributes,transaction={}){
  const new_collection = new Collection(param)
  console.log(new_collection)
  const  result= await new_collection.save({...transaction})
  return result;
}

static async fetchCollections(filter:IncludeOptions){
  const result =  await Collection.findAll(filter)
  return result;
}

static async fetchCollection(filter:IncludeOptions){
  const result =  await Collection.findOne(filter)
  return result;
}

static async editCollection(param:Partial<CollectionCreationAttributes>,filter:UpdateOptions){
  const result =  await Collection.update(param,filter)
  return result;
  }

static async removeCollection(filter:IncludeOptions){
  const result =  await Collection.destroy(filter)
  return result;
  }

}

