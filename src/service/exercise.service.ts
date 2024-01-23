import { IncludeOptions, ModelAttributes, UpdateOptions } from "sequelize";
import { calculateCompletedExerciseWeight } from "../helpers/common";
import { handleError } from "../helpers/handleError";
import { Course } from "../models/course.model";
import { Course_User } from "../models/course_user.model";
import { Exercise } from "../models/exercise.model";
import { Exercise_User } from "../models/exercise_user.model";
import { Lesson } from "../models/lesson.model";
import { Lesson_User } from "../models/lesson_user.model";
import { LessonService } from "./index.service";
import {
  ExerciseCreationAttributes,
  ICourse,
  IncludeOptionsWithTransaction,
} from "../types";

export class ExerciseService {
  static async insertExercise(param: ExerciseCreationAttributes, t = {}) {
    const new_Exercise = new Exercise(param);
    const result = await new_Exercise.save(t);
    return result;
  }

  static async fetchExercises(filter: IncludeOptions) {
    const result = await Exercise.findAll(filter);
    return result;
  }

  static async fetchExercise(filter: IncludeOptions) {
    const result = await Exercise.findOne(filter);
    return result;
  }

  static async fetchExerciseUser(filter: IncludeOptions) {
    const result = await Exercise_User.findOne(filter);
    return result;
  }

  static async fetchExerciseUsers(filter: IncludeOptionsWithTransaction) {
    const result = await Exercise_User.findAll(filter);
    return result;
  }

  static async editExercise(
    param: Partial<ExerciseCreationAttributes>,
    filter: UpdateOptions
  ) {
    const result = await Exercise.update(param, filter);
    return result;
  }

  static async removeExercise(filter: IncludeOptions) {
    const result = await Exercise.destroy(filter);
    return result;
  }

  static async completeExercise(user_id: string, exercise_id: string, t = {}) {
    const param = { is_completed: true };
    const filter = {
      where: {
        userId: user_id,
        exerciseId: exercise_id,
      },
      ...t,
    };
    const result = await Exercise_User.update(param, filter);
    return result;
  }

  static async getCoursesWithProgress(filter: IncludeOptions) {
    const course_tracked = await Course_User.findAll({
      ...filter,
      include: [
        {
          model: Course,
        },
        {
          model: Lesson_User,
          attributes: ["is_started"],
          include: [
            {
              model: Lesson,
              attributes: ["weight"],
            },
            {
              model: Exercise_User,
              attributes: ["is_completed"],
              include: [
                {
                  model: Exercise,
                  attributes: ["weight"],
                },
              ],
            },
          ],
        },
      ],
    });

    const course_with_progress: ICourse[] = course_tracked.map((e) => {
      const progress = calculateCompletedExerciseWeight(e);
      const current_lesson_id = e.currentLessonId;
      return {
        ...e.course?.dataValues!,
        progress,
        current_lesson_id,
      };
    });

    return course_with_progress;
  }

  static async getCoursesInfo(filter: IncludeOptions) {
    const course_info = await Course_User.findAll({
      ...filter,
      attributes: ["currentLessonId"],
      include: [
        {
          model: Course,
          attributes: ["id", "title", "description"],
        },
        {
          model: Lesson_User,
          attributes: ["is_started", "is_completed"],
          include: [
            {
              model: Lesson,
              attributes: ["id", "title"],
            },
            {
              model: Exercise_User,
              attributes: ["is_completed"],
              include: [
                {
                  model: Exercise,
                  attributes: ["id", "title"],
                },
              ],
            },
          ],
        },
      ],
    });
    return course_info;
  }

  static async getExerciseMaxWeightToAssign(
    filter: IncludeOptions,
    lesson_id: string
  ) {
    const lesson = await LessonService.fetchLesson({
      where: { id: lesson_id },
      attributes: ["weight"],
    });
    if (!lesson) {
      return handleError("lesson not found", 404);
    }
    const result = await Exercise.sum("weight", filter);
    return lesson.weight - result;
  }
}
