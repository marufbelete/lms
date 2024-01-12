"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
scalar Date
scalar Time
scalar DateTime

type Role{
    id:ID
    name:String
    updatedAt:Date
 }
type Lesson{
    id:ID
    title:String
    description:String
    exercises:[Exercise]
 }
type Exercise{
    id:ID
    title:String
    description:String
    tests:[Test]
 }
 
type Test{
    id:ID,
    type:String
    fullName:String
    createdAt:DateTime
}

input testInput{
    id:ID,
    createdAt:DateTime
}

input exerciseInput {
    title:String
    description:String
    test:testInput
    }
    

    

type Query{
    Roles: [Role]
    Lessons: [Lesson]
    Exercises: [Exercise]
    Tests :[Test]
}

type Mutation {
    addExercise(input:exerciseInput): Exercise
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map