
import { Course } from "../models/course.model"
import { Course_User } from "../models/course_user.model"
import { Prerequisite } from "../models/prerequisite.model"
import { CourseCreationAttributes } from "../types/course.interface"

export class CourseService{
static async insertCourse(param:CourseCreationAttributes,transaction={}){
  const new_course = new Course({
    ...param
  })
  const  result= await new_course.save({...transaction})
  return result;
}

static async fetchCourses(filter:any){
  const result =  await Course.findAll(filter)
  return result;
}

static async fetchCourse(filter:any){
  const result =  await Course.findOne(filter)
  return result;
}

static async fetchCourse_User(filter:any){
  const result =  await Course_User.findOne(filter)
  return result;
}

static async editCourse(param:any,filter:any){
  const result =  await Course.update(param,filter)
  return result;
  }

static async editCourseUser(param:any,filter:any){
  const result =  await Course_User.update(param,filter)
  return result;
  }

static async removeCourse(filter:any){
  const result =  await Course.destroy(filter)
  return result;
  }

static async currentLesson(userId:string,courseId:string){
    const result =  await Course_User.findOne({
      where:{userId,courseId}
    })
    return result;
  }
  
static async insertBulkPrerequisite(param:any,transaction={}){
    const result = await Prerequisite.bulkCreate(param,{...transaction})
    return result;
  }

static async editPrerequisite(param:any,filter:any){
    const result = await Prerequisite.update(param,filter)
    return result;
  }

static async removePrerequisite(filter:any){
    const result =  await Prerequisite.destroy(filter)
    return result;
    }

static async coursePrerequisiteNotCompleted(course_id:string,user_id:string){ 
    const filter = {
    where: { id:course_id },
    attributes:[],
    include:[{
        model:Course,
        as:'prereq',
        include:{
        model:Course_User,
        where:{userId:user_id,is_completed:false},
        attributes:["is_completed"],
        required:false
        },
        attributes:['id','title','description']
    }]
    };
    return await this.fetchCourse(filter)
  }
}
