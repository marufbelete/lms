
const Exercise = require("../models/exercise.model");

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
  
module.exports={
insertExercise,
fetchExercises,
fetchExercise,
editExercise,
removeExercise
}