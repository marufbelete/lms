const { Op } = require("sequelize");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");

const calculateCompletedExerciseWeight=(data)=> {
    let totalWeight = 0;
    data.lesson_users.forEach(lessonUser => {
        lessonUser.exrecise_users.forEach(exerciseUser => {
          if (exerciseUser.is_completed) {
            totalWeight += exerciseUser.exercise.weight;
          }
        });
      });
    return totalWeight;
  }

const isAllCompleted=(arr)=> {
  const allCompleted = arr.every(exercise => exercise.is_completed === true);
  return allCompleted
  }

const mapUserExerciseInfo=(exercise_info)=> {
  const maped_data = exercise_info.map(item => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      weight: item.weight,
      instruction: item.instruction,
      order: item.order,
      is_completed: item.exrecise_users[0].is_completed,
      step_validation:item.step_validation,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
  });
  return maped_data
  }
  
//also an use diretly the ourse_id in lesson in where and remove the inlude and grouping
const lessonMaxWeightFilter=(course_id)=> {
  const filter={
    include:{
        model:Course,
        where:{
            id:course_id
        },
      
    },
    group: ["course.id"]
}
    return filter;
  }
  
const lessonMaxWeightUpdateFilter=(course_id,lesson_id)=> {
  const filter={
    where:{
      id:{
        [Op.ne]:lesson_id
      }
    },
    include:{
        model:Course,
        where:{
            id:course_id
        }
    },
    group: ["course.id"]
}
    return filter;
  }

//also an use diretly the lesson_id in exerise in where and remove the inlude and grouping
const exerciseMaxWeightFilter=(lesson_id)=> {
  const filter={
    include:{
        model:Lesson,
        where:{
            id:lesson_id
        },
      
    },
    group: ["lesson.id"]
}
    return filter;
  }

const exerciseMaxWeightUpdateFilter=(exercise_id,lesson_id)=> {
  const filter={
    where:{
      id:{
        [Op.ne]:exercise_id
      }
    },
    include:{
        model:Lesson,
        where:{
            id:lesson_id
        }
    },
    group: ["lesson.id"]
}
    return filter;
  }

const getAuthInfo=(userInfo,role_info,access_token)=>{
  const structured_role_info = role_info.map(role => {
    return {
      id: role.id,
      name: role.name,
      is_active: role.user_role.is_active
    };
  });
  const info = {
    id:userInfo.id,
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    email: userInfo.email,
    role_info:structured_role_info,
    access_token
  };
  return info
}

const mapCourseUserInfo=(inputData)=>{
const transformedData = inputData.map((data) => {
  const completedLessons = data.lesson_users.reduce((total, lessonUser) => {
    const completedExercises = lessonUser.exrecise_users.filter(exercise => exercise.dataValues.is_completed);
    if (completedExercises.length === lessonUser.exrecise_users.length) {
      return total + 1;
    }
    return total;
  }, 0);
  
  const lessons = data.lesson_users.map((lessonUser) => {
    const completedExercises = lessonUser.exrecise_users.filter(exercise => exercise.dataValues.is_completed);
    const isComplete = completedExercises.length === lessonUser.exrecise_users.length;
    return {
      id: lessonUser.lesson.dataValues.id,
      title: lessonUser.lesson.dataValues.title,
      completed_exercises: completedExercises.length,
      is_complete: isComplete,
      exercises: lessonUser.exrecise_users.map((exerciseUser) => ({
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


  module.exports={
    calculateCompletedExerciseWeight,
    lessonMaxWeightFilter,
    lessonMaxWeightUpdateFilter,
    exerciseMaxWeightFilter,
    exerciseMaxWeightUpdateFilter,
    getAuthInfo,
    mapCourseUserInfo,
    isAllCompleted,
    mapUserExerciseInfo
  }