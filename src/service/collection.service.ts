import { Collection } from "../models/collection.model";

export class CollectionService{
static async insertCollection(param:any,transaction={}){
  const new_collection = new Collection(param)
  const  result= await new_collection.save({...transaction})
  return result;
}

static async fetchCollections(filter:any){
  const result =  await Collection.findAll(filter)
  return result;
}

static async fetchCollection(filter:any){
  const result =  await Collection.findOne(filter)
  return result;
}

static async editCollection(param:any,filter:any){
  const result =  await Collection.update(param,filter)
  return result;
  }

static async removeCollection(filter:any){
  const result =  await Collection.destroy(filter)
  return result;
  }

}

