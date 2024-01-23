import { WEIGHT } from "../constant/common";
import { Lesson } from "../models/lesson.model";
import { IncludeOptions, Op, UpdateOptions } from "sequelize";
import { Lesson_User } from "../models/lesson_user.model";
import { LessonCreationAttributes } from "../types";

export class LessonService {
  static async insertLesson(param: LessonCreationAttributes, t = {}) {
    const new_Lesson = new Lesson(param);
    const result = await new_Lesson.save(t);
    return result;
  }

  static async fetchLessons(filter: IncludeOptions) {
    const result = await Lesson.findAll(filter);
    return result;
  }

  static async fetchLesson(filter: IncludeOptions) {
    const result = await Lesson.findOne(filter);
    return result;
  }

  static async editLesson(
    param: Partial<LessonCreationAttributes>,
    filter: UpdateOptions
  ) {
    const result = await Lesson.update(param, filter);
    return result;
  }

  static async removeLesson(filter: IncludeOptions) {
    const result = await Lesson.destroy(filter);
    return result;
  }

  static async fetchLessonUser(userId: string, lessonId: string) {
    const result = await Lesson_User.findOne({ where: { lessonId, userId } });
    return result;
  }

  //update in future
  static async getLessonMaxWeightToAssign(filter: IncludeOptions) {
    const result = await Lesson.sum("weight", filter);
    return WEIGHT.MAX - result;
  }

  static async getNextLeastOrderLesson(course_id: string, order_value: number) {
    const leastOrderLesson = await this.fetchLesson({
      where: {
        courseId: course_id,
        order: { [Op.gt]: order_value },
      },
      order: [["order", "ASC"]],
    });
    return leastOrderLesson;
  }

  static async editLessonUser(
    param: Partial<Lesson_User>,
    filter: UpdateOptions
  ) {
    const result = await Lesson_User.update(param, filter);
    return result;
  }
}
