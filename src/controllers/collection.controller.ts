
import { Request,Response,NextFunction } from "express";
import { handleError } from "../helpers/handleError";
import { addCollectionSchema, updateCollectionSchema } from "../validation/collection.validation";
import {CollectionService} from "../service/index.service";
import { Course } from "../models/course.model";
import { mapCollectionCourseImage } from "../helpers/common";
import { getByIdSchema } from "../validation/common.validation";
import { CollectionCreationAttributes } from "../types/collection.interface";

export default{
  addCollection : async(req:Request<{},{},CollectionCreationAttributes>,
    res:Response, next:NextFunction)=>{
      try{
        const param= req.body;
        const {error}=addCollectionSchema.validate(param)
        if(error){
          handleError(error.message,403)
        }
        const result = await CollectionService.insertCollection(param);
        return res.status(201).json(result);
      }
      catch(error){
       next(error)
      }
    },
  
  getCollections : async(req:Request, res:Response, next:NextFunction)=>{
      try{
        const filter = {
          include:[{
            model:Course
            }]
        };
        const result = await CollectionService.fetchCollections(filter);
        const mapped_result = await mapCollectionCourseImage(result);
        return res.json(mapped_result);
      }
      catch(error){
       next(error)
      }
    },

  updateCollection : async(req:Request<{id:string},{},Partial<CollectionCreationAttributes>>, res:Response, next:NextFunction)=>{
      try{
        const {id}=req.params;
        const param=req.body;
        const filter={
          where:{
          id
          },
          returning:true
        };
       
        const {error}=updateCollectionSchema.validate({
          id,...param
        })
        if(error){
          handleError(error.message,403)
        }
        const result = await CollectionService.editCollection(param,filter);
        return res.status(201).json(result);
      }
      catch(error){
       next(error)
      }
    },

  getCollection : async(req:Request, res:Response, next:NextFunction)=>{
      try{
        const {id}=req.params;
        const {error}=getByIdSchema.validate({id})
        if(error){
          handleError(error.message,403)
        }
        const filter={
          where:{id},
            include:[{
              model:Course
            }]
        };
        const result = await CollectionService.fetchCollection(filter);
        if(!result)return res.json(result);
        const [mapped_result] = await mapCollectionCourseImage([result]);
        return res.json(mapped_result);
      }
      catch(error){
       next(error)
      }
    },

  deleteCollection : async(req:Request, res:Response, next:NextFunction)=>{
      try{
        const {id}=req.params;
        const {error}=getByIdSchema.validate({id})
        if(error){
          handleError(error.message,403)
        }
        const filter = {
          where:{
            id
          }
        }
        await CollectionService.removeCollection(filter);
        return res.json({
          status:true
        });
      }
      catch(error){
       next(error)
      }
    }
}
  