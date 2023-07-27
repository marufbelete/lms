
const Course = require("../models/course.model");
const Course_User = require("../models/course_user.model");
const Exercise = require("../models/exercise.model");
const Exercise_User = require("../models/exercise_user.model");
const Lesson_User = require("../models/lesson_user.model");
const sequelize = require("../util/database");

const insertExercise=async(param)=>{
  const new_Exercise = new Exercise(param)
  const  result= await new_Exercise.save()
  return result;
}

const fetchExercises=async(filter)=>{
  const result =  await Exercise.findAll(filter)
  return result;
}

const fetchExercise=async(filter)=>{
  const result =  await Exercise.findOne(filter)
  return result;
}

const editExercise=async(param,filter)=>{
  const result =  await Exercise.update(param,filter)
  return result;
  }

const removeExercise=async(filter)=>{
  const result =  await Exercise.destroy(filter)
  return result;
  }

const completeExercise=async(user_id,exercise_id)=>{
  const param={is_completed:true}
  const filter={
    where:{
      userId:user_id,
      exerciseId:exercise_id
    }
  }
  const result =  await Exercise_User.update(param,filter)
  return result;
  }

const getCoursesWithProgress = async (userId) => {
  const courseProgress = await Course_User.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('Exercise.weight')), 'totalCourseWeight'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN "Exercises_Users"."is_completed" THEN "Exercise"."weight" ELSE 0 END')), 'courseProgress'],
      ],
      include: [
        {
          model: Course,
          attributes: ['title'],
        },
        {
          model: Lesson_User,
          where: { is_opened: true },
          include: {
            model: Exercise_User,
            attributes: [],
            include: {
              model: Exercise,
              // attributes: ['weight'],
            },
          },
        },
      ],
      where: { userId },
      // group: ['courseId', 'Course.name'],
    });

    return courseProgress;
};


module.exports={
insertExercise,
fetchExercises,
fetchExercise,
editExercise,
removeExercise,
completeExercise,
getCoursesWithProgress
}