import { handleError } from "../helpers/handleError";
import { Lesson } from "../models/lesson.model";
import {
  CourseService,
  UserService,
  RoleService,
  ExerciseService,
  LessonService,
} from "../service/index.service";
import { getByIdSchema } from "../validation/common.validation";
import {
  roleToUserSchema,
  courseToUserSchema,
} from "../validation/user.validation";
import sequelize from "../models";
import { Exercise } from "../models/exercise.model";
import { Lesson_User } from "../models/lesson_user.model";
import { mapCourseUserInfo } from "../helpers/common";
import { Exercise_User } from "../models/exercise_user.model";
import { Request, Response, NextFunction } from "express";
import { Course_User } from "../models/course_user.model";

export default {
  addRoleToUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: user_id } = req.params;
      const { role_id } = req.body;
      const { error } = roleToUserSchema.validate({
        user_id,
        role_id,
      });
      if (error) {
        handleError(error.message, 403);
      }

      const user = await UserService.fetchUserById(user_id);
      if (!user) {
        return handleError("user does not exist", 404);
      }
      const existing_user_roles = await user?.$get("roles");
      if (existing_user_roles?.find((e) => e.id === role_id)) {
        return handleError("This role already exist", 403);
      }
      const role = await RoleService.fetchRole({ where: { id: role_id } });
      if (!role) {
        return handleError("role not found", 404);
      }
      await user?.$add("role", role);
      return res.status(201).json({
        success: true,
        message: "role added successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  deleteRoleFromUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: user_id, role_id } = req.params;
      const { error } = roleToUserSchema.validate({
        user_id,
        role_id,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const user = await UserService.fetchUserById(user_id);
      if (!user) {
        handleError("user does not exist", 403);
      }
      const existing_user_roles = await user?.$get("roles");
      if (existing_user_roles?.find((e) => e.id === role_id)) {
        const role = await RoleService.fetchRole({ where: { id: role_id } });
        if (!role) {
          return handleError("role not found", 404);
        }
        await user?.$remove("role", role);
        return res.status(201).json({
          success: true,
          message: "role removed successfully",
        });
      }
      handleError("This role not exist for this user", 403);
    } catch (err) {
      next(err);
    }
  },

  registerUserForCourse: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { id: user_id } = req.params;
        const { course_id } = req.body;
        const { error } = courseToUserSchema.validate({
          user_id,
          course_id,
        });
        if (error) {
          handleError(error.message, 403);
        }
        const user = await UserService.fetchUserById(user_id);
        if (!user) {
          return handleError("user does not exist", 403);
        }
        const existing_user_courses = await user?.$get("courses");
        if (existing_user_courses?.find((e) => e.id === course_id)) {
          handleError("This user already registerd for the course", 403);
        }
        const course = await CourseService.fetchCourse({
          where: { id: course_id },
          include: [
            {
              model: Lesson,
              include: [
                {
                  model: Lesson_User,
                },
                {
                  model: Exercise,
                },
              ],
            },
          ],
        });
        if (!course) {
          return handleError("Course not exist", 403);
        }
        const leastOrderLesson = await LessonService.fetchLesson({
          where: { courseId: course_id },
          order: [
            ["order", "ASC"],
            ["createdAt", "ASC"],
          ],
        });
        if (!leastOrderLesson) {
          return handleError("lesson to start not found", 404);
        }
        const [course_user] = (await user.$add("course", course, {
          through: { currentLessonId: leastOrderLesson.id },
          transaction: t,
        })) as Course_User[];
        const lesson_users = (await user.$add("lessons", course.lessons!, {
          through: { courseUserId: course_user.id },
          transaction: t,
        })) as Lesson_User[];

        await LessonService.editLessonUser(
          { is_started: true },
          {
            where: { lessonId: leastOrderLesson.id, userId: user_id },
            transaction: t,
          }
        );

        for (let lesson of course?.lessons || []) {
          let lesson_user = lesson_users?.find((e) => e.lessonId === lesson.id);
          await user.$add("exercises", lesson?.exercises!, {
            through: { lessonUserId: lesson_user?.id },
            transaction: t,
          });
        }
        return res.status(201).json({
          success: true,
          message: "You are registerd for the course successfully",
        });
      });
    } catch (err) {
      next(err);
    }
  },

  getUserCoursesWithProgress: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { error } = getByIdSchema.validate({
        id,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const user = await UserService.fetchUserById(id);
      if (!user) {
        handleError("user does not exist", 403);
      }
      const user_courses = await ExerciseService.getCoursesWithProgress({
        where: { userId: id },
      });
      return res.json(user_courses);
    } catch (err) {
      next(err);
    }
  },

  getUserCoursesInfo: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { error } = getByIdSchema.validate({
        id,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const user = await UserService.fetchUserById(id);
      if (!user) {
        handleError("user does not exist", 403);
      }
      const user_courses = await ExerciseService.getCoursesInfo({
        where: { userId: id },
        order: [
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Lesson, as: "lesson" },
            "order",
            "ASC",
          ],
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Lesson, as: "lesson" },
            "createdAt",
            "ASC",
          ],
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Exercise_User, as: "exercise_users" },
            { model: Exercise, as: "exercise" },
            "order",
            "ASC",
          ],
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Exercise_User, as: "exercise_users" },
            { model: Exercise, as: "exercise" },
            "createdAt",
            "ASC",
          ],
        ],
      });

      return res.json(mapCourseUserInfo(user_courses));
    } catch (err) {
      next(err);
    }
  },

  getUserCourseWithProgress: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: user_id, course_id } = req.params;
      const { error } = courseToUserSchema.validate({
        user_id,
        course_id,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const user = await UserService.fetchUserById(user_id);
      if (!user) {
        handleError("user does not exist", 403);
      }
      const user_course = await ExerciseService.getCoursesWithProgress({
        where: { userId: user_id, courseId: course_id },
      });
      if (user_course.length == 0) {
        return handleError("Course progress for the user not found", 404);
      }
      return res.json(user_course[0]);
    } catch (err) {
      next(err);
    }
  },

  getUserCourseInfo: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: user_id, course_id } = req.params;
      const { error } = courseToUserSchema.validate({
        user_id,
        course_id,
      });
      if (error) {
        handleError(error.message, 403);
      }
      const user = await UserService.fetchUserById(user_id);
      if (!user) {
        handleError("user does not exist", 403);
      }
      const user_courses = await ExerciseService.getCoursesInfo({
        where: { userId: user_id, courseId: course_id },
        order: [
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Lesson, as: "lesson" },
            "order",
            "ASC",
          ],
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Lesson, as: "lesson" },
            "createdAt",
            "ASC",
          ],
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Exercise_User, as: "exercise_users" },
            { model: Exercise, as: "exercise" },
            "order",
            "ASC",
          ],
          [
            { model: Lesson_User, as: "lesson_users" },
            { model: Exercise_User, as: "exercise_users" },
            { model: Exercise, as: "exercise" },
            "createdAt",
            "ASC",
          ],
        ],
      });
      if (user_courses.length < 1) {
        handleError("course not found", 404);
      }
      const [user_course] = mapCourseUserInfo(user_courses);
      return res.json(user_course);
    } catch (err) {
      next(err);
    }
  },
};
