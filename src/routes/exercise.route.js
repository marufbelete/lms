const express=require('express')
const route=express.Router({ mergeParams: true })
const {addExercise,getExercises,updateExercise,
getExercise,deleteExercise}=require('../controllers/exercise.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')

route.post('/',addExercise,errorHandler)
route.get('/',getExercises,errorHandler)
route.put('/:exercise_id',updateExercise,errorHandler)
route.get('/:exercise_id',getExercise,errorHandler)
route.delete('/:exercise_id',deleteExercise,errorHandler)

module.exports=route