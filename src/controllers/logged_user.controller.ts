import sequelize from "../models";
import { getByIdSchema } from "../validation/common.validation";
import config from "../config/config";
import { Request, Response, NextFunction } from "express";
import { Course } from "../models/course.model";
import {
  mapCollectionCourseImage,
  mapCourseCompleted,
  mapCourseImage,
  mapCourseUserInfo,
  mapUserExerciseInfo,
  paginate,
} from "../helpers/common";
import {
  courseToLoggedUserSchema,
  lessonIdSchema,
  updateUserSchema,
} from "../validation/user.validation";
import { handleError } from "../helpers/handleError";
import { getLoggedUser, mapUserRole } from "../helpers/user";
import { getImage, removeImage, saveImage } from "../helpers/file";
import {
  UserService,
  CourseService,
  LessonService,
  ExerciseService,
} from "../service/index.service";
import { Lesson } from "../models/lesson.model";
import { Lesson_User } from "../models/lesson_user.model";
import { Exercise } from "../models/exercise.model";
import { Exercise_User } from "../models/exercise_user.model";
import { StepValidation } from "../models/step_validation.model";
import { Course_User } from "../models/course_user.model";
import {
  IResponse,
  IncludeOptionsWithTransaction,
  UserResponse,
} from "../types";
import { User } from "../models/user.model";
import { IncludeOptions } from "sequelize";

export default {
  updateLoggedUserProfile: async (
    req: Request,
    res: Response,
    // <IResponse<UserResponse>, {}>,
    next: NextFunction
  ) => {
    try {
      const { error } = updateUserSchema.validate(req.body);
      if (error) {
        handleError(error.message, 400);
      }

      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("user not exist!", 404);
      }
      const update_info = { ...req.body };
      let profile_url;
      let key = user?.avatar;
      if (req.file) {
        key = await saveImage(req.file, config.AWS_PROFILE_FOLDER);
        user?.avatar && (await removeImage(user.avatar));
        update_info.avatar = key;
      }
      if (key) {
        profile_url = await getImage(key);
      }

      await UserService.editUser(update_info, {
        where: {
          id: user?.id,
        },
      });
      user.reload();
      return res.status(201).json(mapUserRole(user, profile_url));
    } catch (err) {
      next(err);
    }
  },

  getLoggedUserProfile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await getLoggedUser(req);
      let profile_url;
      if (!user) {
        return handleError("access forbidden", 403);
      }
      if (user && user?.avatar) {
        profile_url = await getImage(user?.avatar);
      }
      return res.status(200).json(mapUserRole(user, profile_url));
    } catch (err) {
      next(err);
    }
  },

  registerLoggedUserForCourse: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { course_id } = req.body as { course_id: string };
        const { error } = courseToLoggedUserSchema.validate({
          course_id,
        });
        if (error) {
          handleError(error.message, 400);
        }
        const user = await getLoggedUser(req);
        if (!user) {
          return handleError("user not exist", 404);
        }
        const existing_user_courses = await user.$get("courses");
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
          return handleError("Course not exist", 404);
        }

        const [course_user] = (await user?.$add("course", course, {
          transaction: t,
        })) as Course_User[];
        const lesson_users = (await user?.$add("lessons", course.lessons!, {
          through: { courseUserId: course_user.id },
          transaction: t,
        })) as Lesson_User[];

        for (let lesson of course?.lessons || []) {
          let lesson_user = lesson_users.find((e) => e.lessonId === lesson.id);
          lesson_user &&
            (await user?.$add("exercises", lesson.exercises!, {
              through: { lessonUserId: lesson_user.id },
              transaction: t,
            }));
        }
        const collection = await course.$get("collection");
        if (!collection) return res.status(201).json(course);
        if (await collection.$has("user", user!))
          return res.status(201).json(course);
        await collection.$add("user", user!, { transaction: t });
        return res.status(201).json(course);
      });
    } catch (err) {
      next(err);
    }
  },

  startCourse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { course_id, force } = req.body;
        const user = await getLoggedUser(req);
        if (!user) {
          return handleError("user does not exist", 404);
        }
        if (!force) {
          const prereq_info =
            await CourseService.coursePrerequisiteNotCompleted(
              course_id,
              user.id
            );
          if (
            prereq_info &&
            prereq_info.prereq &&
            prereq_info.prereq.length > 0
          ) {
            return res.status(403).json({
              message:
                "Would you like to continue without completing the prerequisite course?",
              data: prereq_info,
              status: false,
            });
          }
        }
        const leastOrderLesson = await LessonService.fetchLesson({
          where: { courseId: course_id },
          order: [
            ["order", "ASC"],
            ["createdAt", "ASC"],
          ],
        });
        if (!leastOrderLesson) {
          return handleError("unable to find the lesson", 404);
        }
        await CourseService.editCourseUser(
          {
            currentLessonId: leastOrderLesson.id,
            is_started: true,
          },
          { where: { userId: user?.id, courseId: course_id } }
        );
        await LessonService.editLessonUser(
          { is_started: true },
          {
            where: { lessonId: leastOrderLesson.id, userId: user?.id },
            transaction: t,
          }
        );
        const filter: IncludeOptionsWithTransaction = {
          where: { id: course_id },
          include: [
            {
              model: Lesson,
              as: "lessons",
            },
          ],
          order: [
            [{ model: Lesson, as: "lessons" }, "order", "ASC"],
            [{ model: Lesson, as: "lessons" }, "createdAt", "ASC"],
          ],
          transaction: t,
        };
        const result = await CourseService.fetchCourse(filter);
        if (!result) return res.json(result);
        const [mapped_result] = await mapCourseImage([result]);
        return res.json(mapped_result);
      });
    } catch (err) {
      next(err);
    }
  },

  getLoggedUserCoursesWithProgress: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("user not exist", 400);
      }
      const user_courses = await ExerciseService.getCoursesWithProgress({
        where: { userId: user.id },
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
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("user does not exist", 403);
      }
      const user_courses = await ExerciseService.getCoursesInfo({
        where: { userId: user.id },
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

  getLoggedUserCourseWithProgress: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { course_id } = req.params;
      const { error } = courseToLoggedUserSchema.validate({
        course_id,
      });
      if (error) {
        handleError(error.message, 404);
      }
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("user not exist", 404);
      }
      const user_course = await ExerciseService.getCoursesWithProgress({
        where: { userId: user.id, courseId: course_id },
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
      const { course_id } = req.params;
      const { error } = courseToLoggedUserSchema.validate({
        course_id,
      });
      if (error) {
        handleError(error.message, 404);
      }
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("user does not exist", 404);
      }
      const user_courses = await ExerciseService.getCoursesInfo({
        where: { userId: user.id, courseId: course_id },
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

  getUserExerciseInfo: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { lesson_id } = req.params;
      const { error } = lessonIdSchema.validate({
        lesson_id,
      });
      if (error) {
        handleError(error.message, 400);
      }
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("User does not exist", 404);
      }
      const lesson_user = await LessonService.fetchLessonUser(
        user.id,
        lesson_id
      );
      if (!lesson_user) {
        return handleError("The given lesson not found", 404);
      }
      const exercises_info = await ExerciseService.fetchExercises({
        order: [
          ["order", "ASC"],
          ["createdAt", "ASC"],
        ],
        include: [
          {
            model: Exercise_User,
            where: {
              userId: user.id,
              lessonUserId: lesson_user.id,
            },
          },
          {
            model: StepValidation,
            attributes: ["type"],
          },
        ],
      });

      const maped_data = mapUserExerciseInfo(exercises_info);
      return res.status(200).json(maped_data);
    } catch (err) {
      next(err);
    }
  },

  getUserCollections: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await getLoggedUser(req);
      if (!user) {
        return handleError("User does not exist", 404);
      }
      const filter: IncludeOptions = {
        include: [
          {
            model: Course,
          },
        ],
      };
      const result = await user.$get("collections", filter);
      const mapped_result = await mapCollectionCourseImage(result);
      return res.json(mapped_result);
    } catch (error) {
      next(error);
    }
  },
};
