const { insertExercise,fetchExercises,
editExercise,fetchExercise, removeExercise } = require("../service/exercise");
const {validateUpdateExerciseInput, validateAddExerciseInput } = require("../validation/exercise.validation");
const { getByIdSchema } = require("../validation/common.validation");
const { handleError } = require("../helpers/handleError");
const Lesson = require("../models/lesson.model");
const { fetchLesson } = require("../service/lesson");
const StepValidation = require("../models/step_validation.model");

exports.addExercise = async (req, res, next) => {
  try {
    const param = req.body;
    const { lesson_id } = req.params;
    const { error } = await validateAddExerciseInput({ ...param, lesson_id });
    if (error) {
      handleError(error.message, 403);
    }

    const exercise = await insertExercise(param);

    // Check for StepValidation parameters and create if they exist in the request
    const stepValidationParam = req.body.stepValidation;
    if (stepValidationParam) {
      const stepValidation = await StepValidation.create(stepValidationParam);
      await exercise.setStepValidation(stepValidation);
    }

    const lesson = await fetchLesson({ where: { id: lesson_id } });
    if (!lesson) {
      handleError("lesson does not exist", 403);
    }
    await lesson.addExercise(exercise);

    return res.status(201).json({
      success: true,
      message: "exercise added",
    });
  } catch (error) {
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
    const { exercise_id } = req.params;
    const param = req.body;

    const { error } = await validateUpdateExerciseInput({
      exercise_id,
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
      if (existingExercise.StepValidation) {
        await existingExercise.StepValidation.update(stepValidationParam);
      } else {
        const newStepValidation = await StepValidation.create(
          stepValidationParam
        );
        await existingExercise.setStepValidation(newStepValidation);
      }
    }

    const updatedExercise = await existingExercise.update(param);
    return res.status(200).json(updatedExercise);
  } catch (error) {
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