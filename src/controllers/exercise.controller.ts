import { Lesson } from "../models/lesson.model";
import { StepValidation } from "../models/step_validation.model";
import { Exercise } from "../models/exercise.model";
import { User } from "../models/user.model";
import { Lesson_User } from "../models/lesson_user.model";
import sequelize from "../models";
import { Request,Response,NextFunction } from "express";
import { handleError } from "../helpers/handleError";
import { completeExerciseSchema, validateAddExerciseInput, validateUpdateExerciseInput } from "../validation/exercise.validation";
import { ExerciseService,LessonService,CourseService } from "../service/index.service";
import { getLoggedUser } from "../helpers/user";
import { isAllCompleted } from "../helpers/common";
import { getByIdSchema } from "../validation/common.validation";
import { ExerciseCreationAttributes } from "../types/index";
import { IncludeOptions } from "sequelize";

export default{
  addExercise : async (req:Request<{lesson_id:string},{},ExerciseCreationAttributes>, res:Response, next:NextFunction) => {
    try {
      await sequelize.transaction(async (t) => {
      const param = req.body;
      const { lesson_id } = req.params;
      const { error } = await validateAddExerciseInput({ ...param, lesson_id });
      if (error) {
        handleError(error.message, 400);
      }
  
      const exercise = await ExerciseService.insertExercise(param, { transaction: t });
  
      // Check for StepValidation parameters and create if they exist in the request
      const stepValidationParam = req.body.stepValidation;
      if (stepValidationParam) {
        const stepValidation = await StepValidation.create(stepValidationParam, {
          transaction: t,
        });
        await exercise.$set('step_validation',stepValidation, { transaction: t });
      }
  
      const lesson = await LessonService.fetchLesson({ where: { id: lesson_id } });
      if (!lesson) {
        handleError("lesson does not exist", 403);
      }
      await lesson.$add('exercise',exercise, { transaction: t });
  
      const lesson_takers = await Lesson_User.findAll({
        where: { lessonId: lesson_id },
        include: { model: User },
      });
  
      if (lesson_takers.length > 0) {
        for (const lesson_taker of lesson_takers) {
          await lesson_taker.user?.$add('exercise',exercise, {
            through: { lessonUserId: lesson_taker.id },
            transaction: t,
          });
        }
      }
        return res.status(201).json({
        success: true,
        message: "exercise added",
      });
      });
    } catch (error) {
      next(error);
    }
  },
  
  getExercises : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { lesson } = req.query;
      const { lesson_id } = req.params;
      const filter:IncludeOptions = {
        where: {
          lessonId: lesson_id,
        },
        include: [
          {
            model: StepValidation,
            attributes: ["type"],
          },
        ],
        order: [
          ["order", "ASC"],
          ["createdAt", "ASC"],
        ],
      };
      if (lesson) {
        filter.include!.push({
          model: Lesson,
        });
      }
      const result = await ExerciseService.fetchExercises(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  completeExercise : async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await sequelize.transaction(async (t) => {
        const { exercise_id } = req.params;
        const { type, input } = req.body;
        const { error } = completeExerciseSchema.validate({
              ...req.body,
              ...req.params,
            });
      
            if (error) {
              handleError(error.message, 400);
            }
      
            const user = await getLoggedUser(req);
            if (!user) {
             return handleError("user not found", 404);
            }
            const exercise = await ExerciseService.fetchExercise({
              where: { id: exercise_id },
            });
      
          const step_validation = await exercise.$get('step_validation');
          if(!step_validation)
            {
              return handleError("Step validation not found",404);
            }      
          if (step_validation.type.toLowerCase().trim() !== "info") {
              if (
                step_validation.type.toLowerCase().trim() !==
                  type.toLowerCase().trim() ||
                step_validation.input.toLowerCase().trim() !==
                  input.toLowerCase().trim()
              ) {
                handleError(step_validation.error_message, 403);
              }
            }
            const lesson = await exercise?.$get('lesson');
            const lesson_user= await lesson?.$get('lesson_users',{
              where: { userId: user.id },
            });
            await ExerciseService.completeExercise(user.id, exercise_id, { transaction: t });
            if(!lesson_user||lesson_user.length<=0){
              return handleError("Error with course relation",403)
            }
            const exercise_user = await ExerciseService.fetchExerciseUsers({
              where: { lessonUserId: lesson_user[0].id },
              transaction: t,
            });
          
            if (isAllCompleted(exercise_user)) {
              if(lesson){
                const next_lesson = await LessonService.getNextLeastOrderLesson(
                  lesson.courseId,
                  lesson.order
                );
                const course_user = await CourseService.fetchCourse_User({
                  where: { courseId: lesson.courseId, userId: user.id },
                });
              await LessonService.editLessonUser(
                { is_completed: true },
                {
                  where: {
                    is_completed: false,
                    is_started: true,
                    userId: user.id,
                    courseUserId: course_user.id,
                  },
                  transaction: t,
                }
              );
              if (next_lesson) {
                await Lesson_User.update(
                  { is_started: true },
                  {
                    where: { lessonId: next_lesson.id, userId: user.id },
                    transaction: t,
                  }
                );
                course_user.currentLessonId = next_lesson.id;
                await course_user.save({ transaction: t });
              }
             }
           }
            return step_validation.success_message;
          });
          return res.status(201).json({ message: result, success: true });
        } catch (error) {
          next(error);
        }
  },

updateExercise : async (req:Request<{exercise_id:string},{},Partial<ExerciseCreationAttributes>>, res:Response, next:NextFunction) => {
    try {
      const { exercise_id } = req.params;
      const param = req.body;
      const exercise = await ExerciseService.fetchExercise({ where: { id: exercise_id } });
      const { error } = await validateUpdateExerciseInput({
        exercise_id,
        lesson_id: exercise.lessonId,
        ...param,
      });
  
      if (error) {
        handleError(error.message, 400);
      }
  
      // Fetch existing exercise with associated StepValidation if it exists
      const existingExercise = await Exercise.findOne({
        where: { id: exercise_id },
        include: StepValidation,
      });
  
      if (!existingExercise) {
        return handleError("Exercise not found", 404);
      }
  
      // Extract StepValidation parameters from the request and update/create as necessary
      const stepValidationParam = req.body.stepValidation;
      if (stepValidationParam) {
        if (existingExercise.step_validation) {
          await existingExercise?.step_validation.update(stepValidationParam);
        } else {
          await StepValidation.create({
            ...stepValidationParam,
            exerciseId: existingExercise.id,
          });
        }
      }
      const updatedExercise = await existingExercise?.update(param);
      return res.status(200).json(updatedExercise);
    } catch (error) {
      next(error);
    }
  },
  
 getExercise : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { exercise_id } = req.params;
      const { lesson } = req.query;
      const { error } = getByIdSchema.validate({ id: exercise_id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter:IncludeOptions = {
        where: { id: exercise_id },
        include: [
          {
            model: StepValidation,
            attributes: ["type"],
          },
        ],
      };
  
      if (lesson) {
        filter.include!.push({
          model: Lesson,
        });
      }
  
      const result = await ExerciseService.fetchExercise(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  deleteExercise : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { exercise_id } = req.params;
      const { error } = getByIdSchema.validate({ id: exercise_id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter = {
        where: {
          id: exercise_id,
        },
      };
      const result = await ExerciseService.removeExercise(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
  