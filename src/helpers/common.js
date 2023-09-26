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
const transformedData = inputData.map((course) => {
  const completedLessons = course.lesson_users.reduce((total, lessonUser) => {
    const completedExercises = lessonUser.exrecise_users.filter(exercise => exercise.dataValues.is_completed);
    if (completedExercises.length === lessonUser.exrecise_users.length) {
      return total + 1;
    }
    return total;
  }, 0);
  
  const lessons = course.lesson_users.map((lessonUser) => {
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
    id: course.course.id,
    title: course.course.title,
    description: course.course.description,
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
    isAllCompleted
  }