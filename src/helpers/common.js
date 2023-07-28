const { Sequelize,Op } = require("sequelize");
const Course = require("../models/course.model");

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

  module.exports={
    calculateCompletedExerciseWeight,
    lessonMaxWeightFilter,
    lessonMaxWeightUpdateFilter
  }