
import { UpdateOptions } from "sequelize";
import { calculateCompletedExerciseWeight } from "../helpers/common";
import { handleError } from "../helpers/handleError";
import { Course } from "../models/course.model";
import { Course_User } from "../models/course_user.model";
import { Exercise } from "../models/exercise.model";
import { Exercise_User } from "../models/exercise_user.model";
import { Lesson } from "../models/lesson.model";
import { Lesson_User } from "../models/lesson_user.model";
import { LessonService} from "./index.service";

export class ExerciseService{

static async insertExercise(param:any,t={}){
  const new_Exercise = new Exercise(param)
  const  result= await new_Exercise.save(t)
  return result;
}

static async fetchExercises(filter:any){
  const result =  await Exercise.findAll(filter)
  return result;
}

static async fetchExercise(filter:any){
  const result =  await Exercise.findOne(filter)
  return result;
}

static async fetchExerciseUser(filter:any){
  const result =  await Exercise_User.findOne(filter)
  return result;
}

static async fetchExerciseUsers(filter:any){
  const result =  await Exercise_User.findAll(filter)
  return result;
}

static async editExercise(param:any,filter:any){
  const result =  await Exercise.update(param,filter)
  return result;
}

static async removeExercise(filter:any){
  const result =  await Exercise.destroy(filter)
  return result;
  }


static async completeExercise(user_id:string,exercise_id:string,t={}){
  const param={is_completed:true}
  const filter={
    where:{
      userId:user_id,
      exerciseId:exercise_id
    },
    ...t
  }
  const result =  await Exercise_User.update(param,filter)
  return result;
  }


static async getCoursesWithProgress (filter:any)  {
  const course_tracked = await Course_User.findAll({
      ...filter,
      include: [
        {
          model: Course,
        },
        {
          model: Lesson_User,
          attributes: ['is_started',
        ],
          include: [
            {
              model: Lesson,
              attributes: ['weight'],
            },
            {
            model: Exercise_User,
            attributes: ['is_completed'],
            include: {
              model: Exercise,
              attributes: ['weight'],
            },
          }
        ],
        },
      ]
      
    });
    const course_with_rogress=course_tracked.map((e:any)=>{
        e.course.dataValues.progress=calculateCompletedExerciseWeight(e)
        e.course.dataValues.current_lesson_id=e.currentLessonId
        return (e.course)
      })
      return course_with_rogress;
};

static async getCoursesInfo (filter:any)  {
  const course_info = await Course_User.findAll({
      ...filter,
      attributes: ['currentLessonId'],
      include: [
        {
          model: Course,
          attributes: ['id','title','description'],
        },
        {
          model: Lesson_User,
          attributes: ['is_started'],
          include: [
            {
              model: Lesson,
              attributes: ['id','title']
            },
            {
              model: Exercise_User,
              attributes: ['is_completed'],
              include: {
                model: Exercise,
                attributes: ['id','title']
              }
            }
        ],
        },
      ]  
    });
    return course_info;
};

static async getExerciseMaxWeightToAssign(filter:any,lesson_id:string){
  const lesson:any =  await LessonService.fetchLesson({where:{id:lesson_id},attributes:['weight']})
  if(!lesson){
    handleError("lesson not found",404)
  }
  const result =  await Exercise.sum('weight',filter)
  return lesson.weight-result;
  }

}