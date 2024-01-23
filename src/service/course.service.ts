import { IncludeOptions, UpdateOptions } from "sequelize";
import { Course } from "../models/course.model";
import { Course_User } from "../models/course_user.model";
import { Prerequisite } from "../models/prerequisite.model";
import { CourseCreationAttributes } from "../types/course.interface";
import { IncludeOptionsWithTransaction } from "../types";

export class CourseService {
  static async insertCourse(param: CourseCreationAttributes, transaction = {}) {
    const new_course = new Course({
      ...param,
    });
    const result = await new_course.save({ ...transaction });
    return result;
  }

  static async fetchCourses(filter: IncludeOptions) {
    const result = await Course.findAll(filter);
    return result;
  }

  static async fetchCourse(filter: IncludeOptions) {
    const result = await Course.findOne(filter);
    return result;
  }

  static async fetchCourse_User(filter: IncludeOptions) {
    const result = await Course_User.findOne(filter);
    return result;
  }

  static async editCourse(
    param: Partial<CourseCreationAttributes>,
    filter: UpdateOptions
  ) {
    const result = await Course.update(param, filter);
    return result;
  }

  static async editCourseUser(
    param: Partial<Course_User>,
    filter: UpdateOptions
  ) {
    const result = await Course_User.update(param, filter);
    return result;
  }

  static async removeCourse(filter: IncludeOptions) {
    const result = await Course.destroy(filter);
    return result;
  }

  static async currentLesson(userId: string, courseId: string) {
    const result = await Course_User.findOne({
      where: { userId, courseId },
    });
    return result;
  }

  static async insertBulkPrerequisite(
    param: { requisiteId: string; prereqId: string }[],
    transaction = {}
  ) {
    const result = await Prerequisite.bulkCreate(param, { ...transaction });
    return result;
  }

  static async editPrerequisite(
    param: Partial<Prerequisite>,
    filter: UpdateOptions
  ) {
    const result = await Prerequisite.update(param, filter);
    return result;
  }

  static async removePrerequisite(filter: IncludeOptionsWithTransaction) {
    const result = await Prerequisite.destroy(filter);
    return result;
  }

  static async coursePrerequisiteNotCompleted(
    course_id: string,
    user_id: string
  ) {
    const filter: IncludeOptions = {
      where: { id: course_id },
      // attributes:[],
      include: [
        {
          model: Course,
          as: "prereq",
          attributes: ["id", "title", "description"],
          through: { attributes: [] },
        },
      ],
    };
    return await this.fetchCourse(filter);
  }
}
