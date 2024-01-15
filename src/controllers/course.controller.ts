import { saveImage, getImage, removeImage } from "../helpers/file";
import { paginate, mapCourseImage } from "../helpers/common";
import sequelize from "../models";
import { Request,Response,NextFunction } from "express";
import { Course } from "../models/course.model";
import { addCourseSchema, updateCourseSchema } from "../validation/course.validation";
import { handleError } from "../helpers/handleError";
import config from "../config/config";
import {CourseService} from "../service/index.service"
import { Exercise } from "../models/exercise.model";
import { Lesson } from "../models/lesson.model";
import { getByIdSchema } from "../validation/common.validation";
import { CourseCreationAttributes } from "../types/course.interface";
import { IncludeOptions, UpdateOptions} from "sequelize";

export default{
  addCourse : async (req:Request<{},{},CourseCreationAttributes>, res:Response, next:NextFunction) => {
    try {
      return await sequelize.transaction(async (t) => {
      const param = req.body;
      const { error } = addCourseSchema.validate(param);
      if (error) {
        handleError(error.message, 403);
      }
     let cover_url
      if(req.file){
        const key = await saveImage(req.file,config.AWS_COURSE_FOLDER)
        cover_url= await getImage(key)
        param.image=key
      }
     
      const result = await CourseService.insertCourse(param,{transaction:t});
      if(param.prerequisiteIds&&param.prerequisiteIds.length>0){
        const prerequisite_info=param.prerequisiteIds
        .map(id=>({requisiteId:result.id,prereqId:id}))
        await CourseService.insertBulkPrerequisite(prerequisite_info,{transaction:t})
        await result.reload({include:[{
          model:Course,
          as:'prereq',
          through:{
            attributes:[]
          },
          attributes:['id','title','description']
        }],transaction:t})}
      result.dataValues.cover_url=cover_url
      return res.status(201).json(result);
    });
    
    } catch (error) {
      next(error);
    }
  },
  
   getCourses : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { lesson,page,pageSize } = req.query;
    
      const filter:IncludeOptions = {
        include:[{
          model:Course,
          as:'prereq',
          through:{
            attributes:[]
          },
          attributes:['id','title','description']
        }]
      };
      if (lesson) {
        filter.order = [
          [{model:Lesson, as: 'lessons'}, "order", "ASC"],
          [{model:Lesson, as: 'lessons'}, "createdAt", "ASC"],
        ];
        filter.include!.push({
          model: Lesson,
          as: 'lessons'
        });
      }
      const result = await CourseService.fetchCourses(paginate(filter,{page:Number(page)||1,pageSize:Number(pageSize)||9}));
      const mapped_result = await mapCourseImage(result);
      return res.json(mapped_result);
    } catch (error) {
      next(error);
    }
  },
  
   getCoursesInfo : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { page,pageSize } = req.query;
      const filter:IncludeOptions = {
        attributes: ["id", "title", "description","image"],
        order: [
          [{model:Lesson, as: 'lessons'}, "order", "ASC"],
          [{model:Lesson, as: 'lessons'}, "createdAt", "ASC"],
          [{model:Lesson, as: 'lessons'}, {model:Exercise,as:'exercises'}, "order", "ASC"],
          [{model:Lesson, as: 'lessons'}, {model:Exercise,as:'exercises'}, "createdAt", "ASC"],
        ],
        include: [
          {
            model: Lesson,
            attributes: ["id", "title"],
  
            include: [{
              model: Exercise,
              attributes: ["id", "title"],
            }],
          },
          {
            model:Course,
            as:'prereq',
            through:{
              attributes:[]
            },
            attributes:['id','title','description']
          }
        ],
      };
      const result = await CourseService.fetchCourses(paginate(filter,{page:Number(page)||1,pageSize:Number(pageSize)||9}));
      const mapped_result = await mapCourseImage(result);
      return res.json(mapped_result);
    } catch (error) {
      next(error);
    }
  },
  
   updateCourse : async (req:Request<{id:string},{},Partial<CourseCreationAttributes>>, res:Response, next:NextFunction) => {
    try {
      return await sequelize.transaction(async (t) => {
      const { id } = req.params;
      const param = req.body;
      const filter:UpdateOptions = {
        where: {
          id
        },
        transaction:t,
        returning:true
      };
      const { error } = updateCourseSchema.validate({
        id,
        ...param,
      });
      if (error) {
        handleError(error.message, 403);
      }
      let cover_url
      const course= await CourseService.fetchCourse(filter)
      if(!course){
       return handleError("course not found",404)
      }
      let key=course.image
      if(req.file){
        key = await saveImage(req.file,config.AWS_COURSE_FOLDER)
        course.image&& await removeImage(course.image)
        param.image=key
      }
      if(key){
        cover_url= await getImage(key)
      }
  
      await CourseService.editCourse(param, filter);
      if(param.prerequisiteIds&&param?.prerequisiteIds?.length>0){
        const prerequisite_info=param.prerequisiteIds
        .map(id=>({requisiteId:course.id,prereqId:id}))
        await CourseService.removePrerequisite({
          where:{requisiteId:course.id},transaction:t
        })
        await CourseService.insertBulkPrerequisite(prerequisite_info,{transaction:t})
      }
  
      await course.reload({transaction:t})
      course.dataValues.cover_url=cover_url
      return res.status(201).json(course);
    })
      
    } catch (error) {
      next(error);
    }
  },
  
   getCourse : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const { lesson} = req.query;
      const { error } = getByIdSchema.validate({ id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter:IncludeOptions = {
        where: { id },
        include:[{
          model:Course,
          as:'prereq',
          through:{
            attributes:[]
          },
          
          attributes:['id','title','description']
        }]
      };
      if (lesson) {
        filter.order = [
          [{model:Lesson, as: 'lessons'}, "order", "ASC"],
          [{model:Lesson, as: 'lessons'}, "createdAt", "ASC"],
        ];
        filter.include!.push({
          model: Lesson,
        });
      }
      const result = await CourseService.fetchCourse(filter);
      if(!result)return res.json(result);
      const [mapped_result] = await mapCourseImage([result]);
      return res.json(mapped_result);
    } catch (error) {
      next(error);
    }
  },
  
   getCourseInfo : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const { error } = getByIdSchema.validate({ id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter:IncludeOptions = {
        where: { id },
        attributes: ["id", "title", "description","image"],
        order: [
          [{model:Lesson, as: 'lessons'}, "order", "ASC"],
          [{model:Lesson, as: 'lessons'}, "createdAt", "ASC"],
          [{model:Lesson, as: 'lessons'}, {model:Exercise,as:'exercises'}, "order", "ASC"],
          [{model:Lesson, as: 'lessons'}, {model:Exercise,as:'exercises'}, "createdAt", "ASC"],
        ],
        include: [
          {
            model: Lesson,
            attributes: ["id", "title"],
            include: [{
              model:Exercise,
              attributes: ["id", "title"],
            }],
          },
          {
            model:Course,
            as:'prereq',
            through:{
              attributes:[]
            },
            attributes:['id','title','description']
          }
        ],
      };
      const result = await CourseService.fetchCourse(filter);
      if(!result){
        return handleError("course not found",404)
      }
      const [mapped_result] = await mapCourseImage([result]);
      return res.json(mapped_result);
    } catch (error) {
      next(error);
    }
  },
  
  deleteCourse : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const { error } = getByIdSchema.validate({ id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter:IncludeOptions = {
        where: {
          id,
        },
      };
      const result = await CourseService.removeCourse(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
  