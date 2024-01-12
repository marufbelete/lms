import express from "express";
const route = express.Router({ mergeParams: true });
import ExerciseController from "../controllers/exercise.controller";
import { errorHandler } from "../middleware/errohandling.middleware";
const PATH = {
  LESSON_EX: "/lesson/:lesson_id/exercise",
  EXERCISE: "/exercise/:exercise_id",
};

route.post(PATH.LESSON_EX, ExerciseController.addExercise, errorHandler);

route.get(PATH.LESSON_EX, ExerciseController.getExercises, errorHandler);

route.put(PATH.EXERCISE, ExerciseController.updateExercise, errorHandler);

route.get(PATH.EXERCISE, ExerciseController.getExercise, errorHandler);

route.delete(PATH.EXERCISE, ExerciseController.deleteExercise, errorHandler);

export default route;
