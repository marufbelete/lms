"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailExist = exports.getAuthInfo = void 0;
// import {Lesson,Course } from"../models";
const user_1 = require("../service/user");
const isEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.fetchUser)({
        where: { email: email }
    }, { scope: 'user_role_state' });
    return user;
});
exports.isEmailExist = isEmailExist;
// const calculateCompletedExerciseWeight=(data)=> {
//     let totalWeight = 0;
//     data.lesson_users.forEach(lessonUser => {
//         lessonUser.exrecise_users.forEach(exerciseUser => {
//           if (exerciseUser.is_completed) {
//             totalWeight += exerciseUser.exercise.weight;
//           }
//         });
//       });
//     return totalWeight;
//   }
// const isAllCompleted=(arr)=> {
//   const allCompleted = arr.every(exercise => exercise.is_completed === true);
//   return allCompleted
//   }
// const mapUserExerciseInfo=(exercise_info)=> {
//   const maped_data = exercise_info.map(item => {
//     return {
//       id: item.id,
//       title: item.title,
//       description: item.description,
//       weight: item.weight,
//       instruction: item.instruction,
//       order: item.order,
//       is_completed: item.exrecise_users[0].is_completed,
//       step_validation:item.step_validation,
//       createdAt: item.createdAt,
//       updatedAt: item.updatedAt
//     };
//   });
//   return maped_data
//   }
//also an use diretly the ourse_id in lesson in where and remove the inlude and grouping
// const lessonMaxWeightFilter=(course_id)=> {
//   const filter={
//     include:{
//         model:Course,
//         where:{
//             id:course_id
//         },
//     },
//     group: ["course.id"]
// }
//     return filter;
//   }
// const lessonMaxWeightUpdateFilter=(course_id,lesson_id)=> {
//   const filter={
//     where:{
//       id:{
//         [Op.ne]:lesson_id
//       }
//     },
//     include:{
//         model:Course,
//         where:{
//             id:course_id
//         }
//     },
//     group: ["course.id"]
// }
//     return filter;
//   }
//also an use diretly the lesson_id in exerise in where and remove the inlude and grouping
// const exerciseMaxWeightFilter=(lesson_id)=> {
//   const filter={
//     include:{
//         model:Lesson,
//         where:{
//             id:lesson_id
//         },
//     },
//     group: ["lesson.id"]
// }
//     return filter;
//   }
// const exerciseMaxWeightUpdateFilter=(exercise_id,lesson_id)=> {
//   const filter={
//     where:{
//       id:{
//         [Op.ne]:exercise_id
//       }
//     },
//     include:{
//         model:Lesson,
//         where:{
//             id:lesson_id
//         }
//     },
//     group: ["lesson.id"]
// }
//     return filter;
//   }
const getAuthInfo = (userInfo, access_token) => {
    const structured_role_info = userInfo.roles.map((role) => {
        return {
            id: role.id,
            name: role.name,
            is_active: role.user_role.is_active
        };
    });
    const info = {
        id: userInfo.id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        role_info: structured_role_info,
        access_token
    };
    return info;
};
exports.getAuthInfo = getAuthInfo;
//# sourceMappingURL=common.js.map