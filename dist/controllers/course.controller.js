"use strict";
// const {
//   insertCourse,
//   fetchCourses,
//   editCourse,
//   fetchCourse,
//   removeCourse,
//   } = require("../service/course");
// const { getByIdSchema } = require("../validation/common.validation");
// const { handleError } = require("../helpers/handleError");
// const Lesson = require("../models/lesson.model");
// const Exercise = require("../models/exercise.model");
// const { saveImage, getImage, removeImage } = require("../helpers/file");
// const config = require("../config/config");
// const { mapCourseImage, paginate } = require("../helpers/common");
// const sequelize = require("../util/database");
// const Course = require("../models/course.model");
// const Course_User = require("../models/course_user.model");
// exports.addCourse = async (req, res, next) => {
//   try {
//     const result= await sequelize.transaction(async (t) => {
//     const param = req.body;
//     const { error } = addCourseSchema.validate(param);
//     if (error) {
//       handleError(error.message, 403);
//     }
//    let cover_url=null
//     if(req.file){
//       const key = await saveImage(req,config.AWS_COURSE_FOLDER)
//       cover_url= await getImage(key)
//       param.image=key
//     }
//     const result = await insertCourse(param,{transaction:t});
//     if(param.prerequisiteIds.length>0){
//       const prerequisite_info=param.prerequisiteIds
//       .map(id=>({requisiteId:result.id,prereqId:id}))
//       result.prerequisite=await insertBulkPrerequisite(prerequisite_info,{transaction:t})
//     }
//     result.cover_url=cover_url
//     return result 
//   });
//   return res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.getCourses = async (req, res, next) => {
//   try {
//     const { lesson,page,pageSize } = req.query;
//     const filter = {
//       include:[{
//         model:Course,
//         as:'prereq',
//         through:{
//           attributes:[]
//         },
//         attributes:['id','title','description']
//       }]
//     };
//     if (lesson) {
//       filter.order = [
//         [Lesson, "order", "ASC"],
//         [Lesson, "createdAt", "ASC"],
//       ];
//       filter.include.push({
//         model: Lesson,
//       });
//     }
//     const result = await fetchCourses(paginate(filter,{page:page||1,pageSize:pageSize||9}));
//     const mapped_result = await mapCourseImage(result);
//     return res.json(mapped_result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.getCoursesInfo = async (req, res, next) => {
//   try {
//     const { page,pageSize } = req.query;
//     const filter = {
//       attributes: ["id", "title", "description","image"],
//       order: [
//         [Lesson, "order", "ASC"],
//         [Lesson, "createdAt", "ASC"],
//         [Lesson, Exercise, "order", "ASC"],
//         [Lesson, Exercise, "createdAt", "ASC"],
//       ],
//       include: [
//         {
//           model: Lesson,
//           attributes: ["id", "title"],
//           include: {
//             model: Exercise,
//             attributes: ["id", "title"],
//           },
//         },
//         {
//           model:Course,
//           as:'prereq',
//           through:{
//             attributes:[]
//           },
//           attributes:['id','title','description']
//         }
//       ],
//     };
//     const result = await fetchCourses(paginate(filter,{page:page||1,pageSize:pageSize||9}));
//     const mapped_result = await mapCourseImage(result);
//     return res.json(mapped_result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.updateCourse = async (req, res, next) => {
//   try {
//     const result= await sequelize.transaction(async (t) => {
//     const { id } = req.params;
//     const param = req.body;
//     const filter = {
//       where: {
//         id
//       },
//       transaction:t,
//       include:[{
//         model:Course,
//         as:'prereq',
//         through:{
//           attributes:[]
//         },
//         attributes:['id','title','description']
//       }],
//       returning:true
//     };
//     const { error } = updateCourseSchema.validate({
//       id,
//       ...param,
//     });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     let cover_url=null
//     const course= await fetchCourse(filter)
//     if(!course){
//       handleError("course not found",404)
//     }
//     let key=course.image
//     if(req.file){
//       key = await saveImage(req,config.AWS_COURSE_FOLDER)
//       course.image&& await removeImage(course.image)
//       param.image=key
//     }
//     if(key){
//       cover_url= await getImage(key)
//     }
//     await editCourse(param, filter);
//     if(param.prerequisiteIds.length>0){
//       const prerequisite_info=param.prerequisiteIds
//       .map(id=>({requisiteId:course.id,prereqId:id}))
//       await removePrerequisite({
//         where:{requisiteId:course.id},transaction:t
//       })
//       await insertBulkPrerequisite(prerequisite_info,{transaction:t})
//     }
//     await course.reload({transaction:t})
//     course.dataValues.cover_url=cover_url
//     return course
//   })
//     return res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.getCourse = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { lesson} = req.query;
//     const { error } = getByIdSchema.validate({ id });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const filter = {
//       where: { id },
//       include:[{
//         model:Course,
//         as:'prereq',
//         through:{
//           attributes:[]
//         },
//         attributes:['id','title','description']
//       }]
//     };
//     if (lesson) {
//       filter.order = [
//         [Lesson, "order", "ASC"],
//         [Lesson, "createdAt", "ASC"],
//       ];
//       filter.include.push({
//         model: Lesson,
//       });
//     }
//     const result = await fetchCourse();
//     console.log(result)
//     const [mapped_result] = await mapCourseImage([result]);
//     return res.json(mapped_result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.getCourseInfo = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { error } = getByIdSchema.validate({ id });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const filter = {
//       where: { id },
//       attributes: ["id", "title", "description","image"],
//       order: [
//         [Lesson, "order", "ASC"],
//         [Lesson, "createdAt", "ASC"],
//         [Lesson, Exercise, "order", "ASC"],
//         [Lesson, Exercise, "createdAt", "ASC"],
//       ],
//       include: [
//         {
//           model: Lesson,
//           attributes: ["id", "title"],
//           include: {
//             model: Exercise,
//             attributes: ["id", "title"],
//           },
//         },
//         {
//           model:Course,
//           as:'prereq',
//           through:{
//             attributes:[]
//           },
//           attributes:['id','title','description']
//         }
//       ],
//     };
//     const result = await fetchCourse(filter);
//     const [mapped_result] = await mapCourseImage([result]);
//     return res.json(mapped_result);
//   } catch (error) {
//     next(error);
//   }
// };
// exports.deleteCourse = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { error } = getByIdSchema.validate({ id });
//     if (error) {
//       handleError(error.message, 403);
//     }
//     const filter = {
//       where: {
//         id,
//       },
//     };
//     const result = await removeCourse(filter);
//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
//# sourceMappingURL=course.controller.js.map