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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_1 = require("../service/lesson");
const role_1 = require("../service/role");
const exercise_1 = require("../service/exercise");
const graphql_scalars_1 = require("graphql-scalars");
const models_1 = require("../models");
const resolvers = {
    Date: graphql_scalars_1.GraphQLDate,
    Time: graphql_scalars_1.GraphQLTime,
    DateTime: graphql_scalars_1.GraphQLDateTime,
    Query: {
        Roles: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const roles = yield (0, role_1.fetchRoles)();
            return roles;
        }),
        Lessons: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const lessons = yield (0, lesson_1.fetchLessons)();
            return lessons;
        }),
        Exercises: (parent, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
            // if (contextValue?.authScope !== 'ADMIN') {
            //     graphqlErrorHandler('user is not admin','UNAUTHENTICATED')
            // }
            const exercises = yield (0, exercise_1.fetchExercises)({
                include: {
                    model: models_1.Test,
                    where: { type: 'type' },
                    attributes: ['id', 'createdAt', 'type', 'fullName']
                }
            });
            return exercises;
        }),
        Tests: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const tests = yield (0, exercise_1.fetchTests)({ attributes: ['id', 'type'] });
            return tests;
        }),
    },
    Lesson: {
        exercises(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const exercises = yield (0, exercise_1.fetchExercises)({ where: { lessonId: parent.id } });
                return exercises;
            });
        }
    },
    //  Exercise:{
    //     async tests(parent,args){
    //         // let now=new Date()
    //         // await inserTest({
    //         //         created_at:now.toISOString(),
    //         //         type:'type',
    //         //         input:'input',
    //         //         exId:'2353fc48-74b4-4e2c-a075-9ed6255ac053',
    //         //         error_message:'error',
    //         //         success_message:'success'
    //         // })
    //     const tests=await fetchTests({where:{exId:parent.id,
    //         // '$Test.type$':'type'
    //         // createdAt:{
    //         // [Op.between]: [new Date('2023-7-10'), new Date('2023-10-12')],
    //         // }
    //     },attributes:['id','createdAt','type','fullName']}) 
    //     return tests
    //    }
    //  },
    Mutation: {
        addExercise: (parent, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
            const { test } = args, exercise = __rest(args, ["test"]);
            const exercises = yield (0, exercise_1.insertExercise)(exercise);
            // await inserTest(args.test)
            //     {
            // created_at:now.toISOString(),
            // type:'type',
            // input:'input',
            // exerciseId:'34bd609e-b45c-47aa-90b4-3e333f91f4ae',
            // error_message:'error',
            // success_message:'success'
            // })
            return exercises;
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolver.js.map