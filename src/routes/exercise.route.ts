import express from "express";
const route = express.Router({ mergeParams: true });
import ExerciseController from "../controllers/exercise.controller";
const PATH = {
  LESSON_EX: "/lesson/:lesson_id/exercise",
  EXERCISE: "/exercise/:exercise_id",
};

route.post(PATH.LESSON_EX, ExerciseController.addExercise);
route.get(PATH.LESSON_EX, ExerciseController.getExercises);
route.put(PATH.EXERCISE, ExerciseController.updateExercise);
route.get(PATH.EXERCISE, ExerciseController.getExercise);
route.delete(PATH.EXERCISE, ExerciseController.deleteExercise);

export default route;
