const { insertExercise,fetchExercises,
editExercise,fetchExercise, removeExercise } = require("../service/exercise");
const {validateUpdateExerciseInput, validateAddExerciseInput } = require("../validation/exercise.validation");
const { getByIdSchema } = require("../validation/common.validation");
const { handleError } = require("../helpers/handleError");
const Lesson = require("../models/lesson.model");
const { fetchLesson } = require("../service/lesson");
const StepValidation = require("../models/step_validation.model");
const Exercise = require("../models/exercise.model");
const User = require("../models/user.model");
const Lesson_User = require("../models/lesson_user.model");
const sequelize=require('../util/database');

exports.addExercise = async (req, res, next) => {
  const t=await sequelize.transaction()
  try {
    const param = req.body;
    const { lesson_id } = req.params;
    const { error } = await validateAddExerciseInput({ ...param, lesson_id });
    if (error) {
      handleError(error.message, 403);
    }

    const exercise = await insertExercise(param,{transaction: t });

    // Check for StepValidation parameters and create if they exist in the request
    const stepValidationParam = req.body.stepValidation;
    if (stepValidationParam) {
      const stepValidation = await StepValidation.create(stepValidationParam,{transaction: t });
      await exercise.setStepValidation(stepValidation,{transaction: t });
    }

    const lesson = await fetchLesson({ where: { id: lesson_id } });
    if (!lesson) {
      handleError("lesson does not exist", 403);
    }
    await lesson.addExercise(exercise,{transaction: t });

    const lesson_takers=await Lesson_User.findAll(
      {where:{lessonId:lesson_id},include:{model:User}})
      if(lesson_takers.length>0){
        for(const lesson_taker of lesson_takers){
          await lesson_taker.user.addExercise(exercise,
            {through: { lessonUserId:lesson_taker.id  },transaction: t })
        }
      }
    
    await t.commit()
    return res.status(201).json({
      success: true,
      message: "exercise added",
    });
  } catch (error) {
    await t.rollback()
    next(error);
  }
};

exports.getExercises = async (req, res, next) => {
  try {
    const { lesson } = req.query;
    const { lesson_id } = req.params;
    const filter = {
      where: {
        lessonId: lesson_id,
      },
    };
    if (lesson) {
      filter.include = {
        model: Lesson,
      };
    }
    const result = await fetchExercises(filter);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateExercise = async (req, res, next) => {
  try {
    const { exercise_id,lesson_id } = req.params;
    const param = req.body;
    const { error } = await validateUpdateExerciseInput({
      exercise_id,
      lesson_id,
      ...param,
    });
   
    if (error) {
      handleError(error.message, 403);
    }

    // Fetch existing exercise with associated StepValidation if it exists
    const existingExercise = await Exercise.findOne({
      where: { id: exercise_id },
      include: StepValidation,
    });

    if (!existingExercise) {
      handleError("Exercise not found", 404);
    }

    // Extract StepValidation parameters from the request and update/create as necessary
    const stepValidationParam = req.body.stepValidation;
    if (stepValidationParam) {
      if (existingExercise.step_validation) {
        await existingExercise.step_validation.update(stepValidationParam);
      } else {
       await StepValidation.create(
          {
            ...stepValidationParam,
            exerciseId:existingExercise.id
          }
        );
      }
    }
    const updatedExercise = await existingExercise.update(param);
    return res.status(200).json(updatedExercise);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.getExercise = async (req, res, next) => {
  try {
    const { exercise_id } = req.params;
    const { lesson } = req.query;
    const { error } = getByIdSchema.validate({ id: exercise_id });
    if (error) {
      handleError(error.message, 403);
    }
    const filter = {
      where: { id: exercise_id },
      include: [{ model: StepValidation }], // Array to hold included models
    };

    if (lesson) {
      filter.include.push({
        model: Lesson,
      });
    }

    // Include the StepValidation if exists
    filter.include.push({
      model: StepValidation,
    });

    const result = await fetchExercise(filter);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteExercise=async(req,res,next)=>{
  try{
    const {exercise_id}=req.params;
    const {error}=getByIdSchema.validate({id:exercise_id})
    if(error){
      handleError(error.message,403)
    }
    const filter = {
      where:{
        id:exercise_id
      }
    }
    const result = await removeExercise(filter);
    return res.json(result);
  }
  catch(error){
   next(error)
  }
}