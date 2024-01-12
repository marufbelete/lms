import { Op } from "sequelize";
import { getImage } from "./file";
import { handleError } from "./handleError";

interface IPaginate{
  page:number,
  pageSize:number
}


export const calculateCompletedExerciseWeight=(data:any)=> {
  let totalWeight = 0;
  data.lesson_users?.forEach((lessonUser:any) => {
      lessonUser.exercise_users?.forEach((exerciseUser:any) => {
        if (exerciseUser.is_completed) {
          totalWeight += exerciseUser.exercise.weight;
        }
      });
    });
  return totalWeight;
}

export const isAllCompleted=(arr:any)=> {
const allCompleted = arr?.every((exercise:any) => exercise.is_completed === true);
return allCompleted
}

export const mapUserExerciseInfo=(exercise_info:any)=> {
const maped_data = exercise_info?.map((item:any) => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    weight: item.weight,
    instruction: item.instruction,
    order: item.order,
    is_completed: item.exercise_users[0].is_completed,
    step_validation:item.step_validation,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  };
});
return maped_data
}

export const lessonMaxWeightFilter=(course_id:string)=> {
const filter={
      where:{
        courseId:course_id
      }
}
  return filter;
}

export const lessonMaxWeightUpdateFilter=(course_id:string,lesson_id:string)=> {
const filter={
  where:{
    id:{
      [Op.ne]:lesson_id
    },
    courseId:course_id
  }
}
  return filter;
}

export const exerciseMaxWeightFilter=(lesson_id:string)=> {
const filter={
  where:{
    lessonId:lesson_id
  }
}
  return filter;
}

export const exerciseMaxWeightUpdateFilter=(exercise_id:string,lesson_id:string)=> {
const filter={
  where:{
    id:{
      [Op.ne]:exercise_id
    },
    lessonId:lesson_id
  }
}
  return filter;
}

export const roleMap=(role_info:any)=>{
const structured_role_info = role_info?.map((role:any) => {
  return {
    id: role.id,
    name: role.name,
    is_active: role.user_role.is_active
  };
});
return structured_role_info
}
export const getAuthInfo=(userInfo:any,role_info:any,access_token:string)=>{
const info = {
  id: userInfo.id,
  first_name: userInfo.first_name,
  last_name: userInfo.last_name,
  email: userInfo.email,
  username: userInfo.username,
  avatar: userInfo.avatar,
  role_info: roleMap(role_info),
  access_token,
};
return info
}

export const mapCourseUserInfo=(inputData:any)=>{
const transformedData = inputData?.map((data:any) => {
const completedLessons = data.lesson_users?.reduce((total:any, lessonUser:any) => {
  const completedExercises = lessonUser.exercise_users?.filter((exercise:any) => exercise.dataValues.is_completed);
  if (completedExercises.length === lessonUser.exercise_users.length) {
    return total + 1;
  }
  return total;
}, 0);

const lessons = data.lesson_users?.map((lessonUser:any) => {
  const completedExercises = lessonUser.exercise_users?.filter((exercise:any) => exercise.dataValues.is_completed);
  const isComplete = completedExercises.length === lessonUser.exercise_users.length;
  return {
    id: lessonUser.lesson.dataValues.id,
    title: lessonUser.lesson.dataValues.title,
    completed_exercises: completedExercises.length,
    is_complete: isComplete,
    exercises: lessonUser.exercise_users?.map((exerciseUser:any) => ({
      id: exerciseUser.exercise.dataValues.id,
      title: exerciseUser.exercise.dataValues.title,
      completed: exerciseUser.dataValues.is_completed,
    })),
  };
});

return {
  id: data.course.id,
  title: data.course.title,
  description: data.course.description,
  current_lesson_id:data.currentLessonId,
  completed_lessons: completedLessons,
  lessons: lessons,
};
});
return transformedData;
}

export const mapCourseImage=async(courses:any)=>{ 
for(let course of courses){
  if(course.image){
    const url= await getImage(course.image)
    course.dataValues.cover_url=url
  }
}
return courses
}

export const mapCollectionCourseImage=async(collections:any)=>{ 
for(let collection of collections){
  for(let course of collection.courses){
    if(course.image){
      const url= await getImage(course.image)
      course.dataValues.cover_url=url
    }
  }
}
return collections
}

export const mapCourseCompleted=(prereq:any)=>{
const mapped_course= prereq.map((course:any)=>({
  id:course.id,
  title:course?.title,
  description:course?.description,
  is_completed:course?.course_users[0]?.is_completed||false
}))
return mapped_course
}

export const paginate = (query:any, { page, pageSize}:IPaginate) => {
if(page<1){
  handleError("page number should bee greater than or equal to 1",400)
}
const offset = (page-1) * pageSize;
const limit = pageSize;
return {
  ...query,
  offset,
  limit
};
};
