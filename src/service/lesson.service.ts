
import { WEIGHT } from "../constant/common";
import { Lesson } from "../models/lesson.model";
import { Op } from "sequelize";
import { Lesson_User } from "../models/lesson_user.model";

export class LessonService{
static async insertLesson(param:any,t={}){
  const new_Lesson = new Lesson(param)
  const  result= await new_Lesson.save(t)
  return result;
}

static async fetchLessons(filter:any){
  const result =  await Lesson.findAll(filter)
  return result;
}

static async fetchLesson(filter:any){
  const result =  await Lesson.findOne(filter)
  return result;
}

static async editLesson(param:any,filter:any){
  const result =  await Lesson.update(param,filter)
  return result;
  }

static async removeLesson(filter:any){
  const result =  await Lesson.destroy(filter)
  return result;
  }

static async fetchLessonUser(userId:string,lessonId:string){
  const result =   await Lesson_User.findOne({where:{lessonId,userId}})
  return result;
  }

//update in future
static async getLessonMaxWeightToAssign(filter:any){
  const result =  await Lesson.sum('weight',filter)
  return WEIGHT.MAX-result;
  }

static async getNextLeastOrderLesson(course_id:string,order_value:string){
  const leastOrderLesson = await this.fetchLesson({
  where: { 
    courseId: course_id,
    order: { [Op.gt]: order_value }
  },
  order: [['order', 'ASC']],
});
return leastOrderLesson
  }

static async editLessonUser(param:any,filter:any){
    const result =  await Lesson_User.update(param,filter)
    return result;
    }
  
}