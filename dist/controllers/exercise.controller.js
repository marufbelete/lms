"use strict";
// const {
//   insertExercise,
//   fetchExercises,
//   fetchExercise,
//   removeExercise,
//   completeExercise,
//   fetchExerciseUsers,
// } = require("../service/exercise");
// const {
//   validateUpdateExerciseInput,
//   validateAddExerciseInput,
//   completeExerciseSchema,
// } = require("../validation/exercise.validation");
// const { getByIdSchema } = require("../validation/common.validation");
// const { handleError } = require("../helpers/handleError");
// const Lesson = require("../models/lesson.model");
// const { fetchLesson, getNextLeastOrderLesson } = require("../service/lesson");
// const StepValidation = require("../models/step_validation.model");
// const Exercise = require("../models/exercise.model");
// const User = require("../models/user.model");
// const Lesson_User = require("../models/lesson_user.model");
// const sequelize = require("../util/database");
// const { getLoggedUser } = require("../helpers/user");
// const { isAllCompleted } = require("../helpers/common");
// const Course_User = require("../models/course_user.model");
// exports.addExercise = async (req, res, next) => {
//   const t = await sequelize.transaction();
//   try {
//     const param = req.body;
//     const { lesson_id } = req.params;
//     const { error } = await validateAddExerciseInput({ ...param, lesson_id });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const exercise = await insertExercise(param, { transaction: t });
//     // Check for StepValidation parameters and create if they exist in the request
//     const stepValidationParam = req.body.stepValidation;
//     if (stepValidationParam) {
//       const stepValidation = await StepValidation.create(stepValidationParam, {
//         transaction: t,
//       });
//       await exercise.setStepValidation(stepValidation, { transaction: t });
//     }
//     const lesson = await fetchLesson({ where: { id: lesson_id } });
//     if (!lesson) {
//       handleError("lesson does not exist", 403);
//     }
//     await lesson.addExercise(exercise, { transaction: t });
//     const lesson_takers = await Lesson_User.findAll({
//       where: { lessonId: lesson_id },
//       include: { model: User },
//     });
//     if (lesson_takers.length > 0) {
//       for (const lesson_taker of lesson_takers) {
//         await lesson_taker.user.addExercise(exercise, {
//           through: { lessonUserId: lesson_taker.id },
//           transaction: t,
//         });
//       }
//     }
//     await t.commit();
//     return res.status(201).json({
//       success: true,
//       message: "exercise added",
//     });
//   } catch (error) {
//     await t.rollback();
//     next(error);
//   }
// };
// exports.getExercises = async (req, res, next) => {
//   try {
//     const { lesson } = req.query;
//     const { lesson_id } = req.params;
//     const filter = {
//       where: {
//         lessonId: lesson_id,
//       },
//       include: [
//         {
//           model: StepValidation,
//           attributes: ["type"],
//         },
//       ],
//       order: [
//         ["order", "ASC"],
//         ["createdAt", "ASC"],
//       ],
//     };
//     if (lesson) {
//       filter.include.push({
//         model: Lesson,
//       });
//     }
//     const result = await fetchExercises(filter);
//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.completeExercise = async (req, res, next) => {
//   try {
//     const result = await sequelize.transaction(async (t) => {
//       const { exercise_id } = req.params;
//       const { type, input } = req.body;
//       const { error } = completeExerciseSchema.validate({
//         ...req.body,
//         ...req.params,
//       });
//       if (error) {
//         handleError(error.message, 403);
//       }
//       const user = await getLoggedUser(req);
//       if (!user) {
//         handleError("user not found", 404);
//       }
//       const exercise = await fetchExercise({
//         where: { id: exercise_id },
//       });
//       const step_validation = await exercise.getStep_validation();
//       if (String(step_validation.type).toLowerCase().trim() !== "info") {
//         if (
//           String(step_validation.type).toLowerCase().trim() !==
//             String(type).toLowerCase().trim() ||
//           String(step_validation.input).toLowerCase().trim() !==
//             String(input).toLowerCase().trim()
//         ) {
//           handleError(step_validation.error_message, 403);
//         }
//       }
//       const lesson = await exercise?.getLesson();
//       const [lesson_user] = await lesson?.getLesson_users({
//         where: { userId: user.id },
//       });
//       await completeExercise(user.id, exercise_id, { transaction: t });
//       const exercise_user = await fetchExerciseUsers({
//         where: { lessonUserId: lesson_user?.id },
//         transaction: t,
//       });
//       if (isAllCompleted(exercise_user)) {
//         const next_lesson = await getNextLeastOrderLesson(
//           lesson.courseId,
//           lesson.order
//         );
//         const course_user = await Course_User.findOne({
//           where: { courseId: lesson.courseId, userId: user.id },
//         });
//         await Lesson_User.update(
//           { is_completed: true },
//           {
//             where: {
//               is_completed: false,
//               is_started: true,
//               userId: user.id,
//               courseUserId: course_user.id,
//             },
//             transaction: t,
//           }
//         );
//         if (next_lesson) {
//           await Lesson_User.update(
//             { is_started: true },
//             {
//               where: { lessonId: next_lesson.id, userId: user.id },
//               transaction: t,
//             }
//           );
//           course_user.currentLessonId = next_lesson.id;
//           await course_user.save({ transaction: t });
//         }
//       }
//       return step_validation.success_message;
//     });
//     return res.status(201).json({ message: result, success: true });
//   } catch (error) {
//     next(error);
//   }
// };
// exports.updateExercise = async (req, res, next) => {
//   try {
//     const { exercise_id } = req.params;
//     const param = req.body;
//     const exercise = await fetchExercise({ where: { id: exercise_id } });
//     const { error } = await validateUpdateExerciseInput({
//       exercise_id,
//       lesson_id: exercise.lessonId,
//       ...param,
//     });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     // Fetch existing exercise with associated StepValidation if it exists
//     const existingExercise = await Exercise.findOne({
//       where: { id: exercise_id },
//       include: StepValidation,
//     });
//     if (!existingExercise) {
//       handleError("Exercise not found", 404);
//     }
//     // Extract StepValidation parameters from the request and update/create as necessary
//     const stepValidationParam = req.body.stepValidation;
//     if (stepValidationParam) {
//       if (existingExercise.step_validation) {
//         await existingExercise.step_validation.update(stepValidationParam);
//       } else {
//         await StepValidation.create({
//           ...stepValidationParam,
//           exerciseId: existingExercise.id,
//         });
//       }
//     }
//     const updatedExercise = await existingExercise.update(param);
//     return res.status(200).json(updatedExercise);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.getExercise = async (req, res, next) => {
//   try {
//     const { exercise_id } = req.params;
//     const { lesson } = req.query;
//     const { error } = getByIdSchema.validate({ id: exercise_id });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const filter = {
//       where: { id: exercise_id },
//       include: [
//         {
//           model: StepValidation,
//           attributes: ["type"],
//         },
//       ],
//     };
//     if (lesson) {
//       filter.include.push({
//         model: Lesson,
//       });
//     }
//     const result = await fetchExercise(filter);
//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.deleteExercise = async (req, res, next) => {
//   try {
//     const { exercise_id } = req.params;
//     const { error } = getByIdSchema.validate({ id: exercise_id });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const filter = {
//       where: {
//         id: exercise_id,
//       },
//     };
//     const result = await removeExercise(filter);
//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
//# sourceMappingURL=exercise.controller.js.map