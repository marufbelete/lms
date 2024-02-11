import { Course } from "../models/course.model";
import { Exercise } from "../models/exercise.model";
import { Course_User } from "../models/course_user.model";
import { User } from "../models/user.model";
import sequelize from "../models";
import { Request, Response, NextFunction } from "express";
import {
  validateAddLessonInput,
  validateUpdateLessonInput,
} from "../validation/lesson.validation";
import { handleError } from "../helpers/handleError";
import { LessonService, CourseService } from "../service/index.service";
import { getByIdSchema } from "../validation/common.validation";
import { IncludeOptions, OrderItem, UpdateOptions } from "sequelize";
import { LessonCreationAttributes } from "../types/lesson.interface";

export default {
  addLesson: async (
    req: Request<{ course_id: string }, {}, LessonCreationAttributes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const param = req.body;
      const { course_id } = req.params;
      const { error } = await validateAddLessonInput({ ...param, course_id });
      if (error) {
        handleError(error.message, 403);
      }
      return await sequelize.transaction(async (t) => {
        const lesson = await LessonService.insertLesson(param, {
          transaction: t,
        });
        const course = await CourseService.fetchCourse({
          where: { id: course_id },
        });
        if (!course) {
          return handleError("course does not exist", 403);
        }
        await course.$add("lesson", lesson, { transaction: t });

        //add to existing user
        const course_takers = await Course_User.findAll({
          where: { courseId: course_id },
          include: { model: User },
        });
        if (course_takers.length > 0) {
          for (const course_taker of course_takers) {
            await course_taker.user?.$add("lesson", lesson, {
              through: { courseUserId: course_taker.id },
              transaction: t,
            });
          }
        }
        await lesson.reload({ transaction: t });
        return res.status(201).json(lesson);
      });
    } catch (error) {
      next(error);
    }
  },

  getLessons: async (
    req: Request<
      { course_id: string },
      { course: string; exercise: string },
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { course, exercise } = req.query;
      const { course_id } = req.params;

      const filter: IncludeOptions = {
        where: {
          courseId: course_id,
        },
        include: [],
        order: [
          ["order", "ASC"],
          ["createdAt", "ASC"],
        ],
      };
      if (course) {
        filter.include?.push({
          model: Course,
        });
      }
      if (exercise) {
        (filter.order as OrderItem[]).push(
          [{ model: Exercise, as: "exercises" }, "order", "ASC"],
          [{ model: Exercise, as: "exercises" }, "createdAt", "ASC"]
        );
        filter.include!.push({
          model: Exercise,
        });
      }
      const result = await LessonService.fetchLessons(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  updateLesson: async (
    req: Request<{ lesson_id: string }, {}, Partial<LessonCreationAttributes>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { lesson_id } = req.params;
      const param = req.body;
      const filter: UpdateOptions = {
        where: {
          id: lesson_id,
        },
      };
      const lesson = await LessonService.fetchLesson({
        where: { id: lesson_id },
      });
      if (!lesson) {
        return handleError("lesson not found", 404);
      }
      const { error } = await validateUpdateLessonInput({
        course_id: lesson.courseId,
        lesson_id,
        ...param,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const result = await LessonService.editLesson(param, filter);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  getLesson: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lesson_id } = req.params;
      const { course, exercise } = req.query;
      const { error } = getByIdSchema.validate({ id: lesson_id });
      if (error) {
        handleError(error.message, 403);
      }

      const filter: IncludeOptions = {
        where: { id: lesson_id },
        include: [],
      };
      if (course) {
        filter.include!.push({
          model: Course,
        });
      }
      if (exercise) {
        filter.order = [
          [{ model: Exercise, as: "exercises" }, "order", "ASC"],
          [{ model: Exercise, as: "exercises" }, "createdAt", "ASC"],
        ];
        filter.include!.push({
          model: Exercise,
        });
      }

      const result = await LessonService.fetchLesson(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteLesson: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lesson_id } = req.params;
      const { error } = getByIdSchema.validate({ id: lesson_id });
      if (error) {
        handleError(error.message, 403);
      }
      const filter: IncludeOptions = {
        where: {
          id: lesson_id,
        },
      };
      const result = await LessonService.removeLesson(filter);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
