
const { calculateCompletedExerciseWeight } = require("../helpers/common");
const { handleError } = require("../helpers/handleError");
const Course = require("../models/course.model");
const Course_User = require("../models/course_user.model");
const Exercise = require("../models/exercise.model");
const Exercise_User = require("../models/exercise_user.model");
const Lesson = require("../models/lesson.model");
const Lesson_User = require("../models/lesson_user.model");
const { fetchLesson } = require("./lesson");

const insertExercise=async(param,t={})=>{
  const new_Exercise = new Exercise(param)
  const  result= await new_Exercise.save(t)
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

const fetchExerciseUser=async(filter)=>{
  const result =  await Exercise_User.findOne(filter)
  return result;
}

const fetchExerciseUsers=async(filter)=>{
  const result =  await Exercise_User.findAll(filter)
  return result;
}

const editExercise=async(param,filter,t={})=>{
  const result =  await Exercise.update(param,filter,...t)
  return result;
  }

const removeExercise=async(filter)=>{
  const result =  await Exercise.destroy(filter)
  return result;
  }


const completeExercise=async(user_id,exercise_id,t={})=>{
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

const getCoursesWithProgress = async (filter) => {
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
              attributes: ['weight',
            ],
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
    const course_with_rogress=course_tracked.map(e=>{
      e.course.dataValues.progress=calculateCompletedExerciseWeight(e)
      e.course.dataValues.current_lesson_id=e.currentLessonId
      return (e.course)
    })
    return course_with_rogress;
};

const getCoursesInfo = async (filter) => {
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
                attributes: ['id','title'],
              }
            }
        ],
        },
      ]  
    });
    console.log(course_info)
    return course_info;
};

const getExerciseMaxWeightToAssign=async(filter,lesson_id)=>{
  const lesson =  await fetchLesson({where:{id:lesson_id},attributes:['weight']})
  if(!lesson){
    handleError("lesson not found",404)
  }
  const result =  await Exercise.sum('exercise.weight',filter)
  return lesson.weight-result;
  }

module.exports={
insertExercise,
fetchExercises,
fetchExercise,
editExercise,
removeExercise,
completeExercise,
getCoursesWithProgress,
getExerciseMaxWeightToAssign,
getCoursesInfo,
fetchExerciseUser,
fetchExerciseUsers
}