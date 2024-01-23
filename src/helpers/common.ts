import { IncludeOptions, Op } from "sequelize";
import { getImage } from "./file";
import { handleError } from "./handleError";
import { Collection } from "../models/collection.model";
import { Exercise } from "../models/exercise.model";
import { Role } from "../models/role.model";
import { Course_User } from "../models/course_user.model";
import { Course } from "../models/course.model";
import { Exercise_User } from "../models/exercise_user.model";

interface IPaginate {
  page: number;
  pageSize: number;
}

export const calculateCompletedExerciseWeight = (data: Course_User) => {
  let totalWeight = 0;
  data.lesson_users?.forEach((lessonUser) => {
    lessonUser.exercise_users?.forEach((exerciseUser) => {
      if (exerciseUser.is_completed && exerciseUser.exercise) {
        totalWeight += exerciseUser.exercise.weight;
      }
    });
  });
  return totalWeight;
};

export const isAllCompleted = (arr: Exercise_User[]) => {
  const allCompleted = arr?.every((exercise) => exercise.is_completed === true);
  return allCompleted;
};

export const mapUserExerciseInfo = (exercise_info: Exercise[]) => {
  const maped_data = exercise_info.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      weight: item.weight,
      instruction: item.instruction,
      order: item.order,
      is_completed: item.exercise_users![0].is_completed,
      step_validation: item.step_validation,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
  return maped_data;
};

export const lessonMaxWeightFilter = (course_id: string) => {
  const filter = {
    where: {
      courseId: course_id,
    },
  };
  return filter;
};

export const lessonMaxWeightUpdateFilter = (
  course_id: string,
  lesson_id: string
) => {
  const filter = {
    where: {
      id: {
        [Op.ne]: lesson_id,
      },
      courseId: course_id,
    },
  };
  return filter;
};

export const exerciseMaxWeightFilter = (lesson_id: string) => {
  const filter = {
    where: {
      lessonId: lesson_id,
    },
  };
  return filter;
};

export const exerciseMaxWeightUpdateFilter = (
  exercise_id: string,
  lesson_id: string
) => {
  const filter = {
    where: {
      id: {
        [Op.ne]: exercise_id,
      },
      lessonId: lesson_id,
    },
  };
  return filter;
};

export const mapCourseUserInfo = (inputData: Course_User[]) => {
  const transformedData = inputData?.map((data) => {
    const completedLessons = data.lesson_users?.reduce((total, lessonUser) => {
      if (lessonUser.dataValues.is_completed) {
        return total + 1;
      }
      return total;
    }, 0);

    const lessons = data.lesson_users?.map((lessonUser) => {
      const completedExercises = lessonUser.exercise_users?.filter(
        (exercise) => exercise.dataValues.is_completed
      );
      return {
        id: lessonUser.lesson?.dataValues.id,
        title: lessonUser.lesson?.dataValues.title,
        completed_exercises: completedExercises?.length,
        is_complete: lessonUser.dataValues.is_completed,
        exercises: lessonUser.exercise_users?.map((exerciseUser) => ({
          id: exerciseUser.exercise?.dataValues.id,
          title: exerciseUser.exercise?.dataValues.title,
          completed: exerciseUser.dataValues.is_completed,
        })),
      };
    });

    return {
      id: data.course?.dataValues.id,
      title: data.course?.dataValues.title,
      description: data.course?.dataValues.description,
      current_lesson_id: data.dataValues.currentLessonId,
      completed_lessons: completedLessons,
      lessons: lessons,
    };
  });
  return transformedData;
};

export const mapCourseImage = async (courses: Course[]) => {
  for (let course of courses) {
    if (course.image) {
      const url = await getImage(course.image);
      course.dataValues.cover_url = url;
    }
  }
  return courses;
};

export const mapCollectionCourseImage = async (collections: Collection[]) => {
  for (let collection of collections) {
    for (let course of collection.courses!) {
      if (course.image) {
        const url = await getImage(course.image);
        course.dataValues.cover_url = url;
      }
    }
  }
  return collections;
};

export const mapCourseCompleted = (prereq: Course[]) => {
  const mapped_course = prereq.map((course) => ({
    id: course.id,
    title: course?.title,
    description: course?.description,
    is_completed: course.course_users![0].is_completed || false,
  }));
  return mapped_course;
};

export const paginate = (
  filter: IncludeOptions,
  { page, pageSize }: IPaginate
) => {
  if (page < 1) {
    handleError("page number should bee greater than or equal to 1", 400);
  }
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  return {
    ...filter,
    offset,
    limit,
  };
};
