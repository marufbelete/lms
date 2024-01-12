import express from "express";
import auth_route from "./auth.route";
import collection_route from "./collection.route";
import course_route from "./course.route";
import exercise_route from "./exercise.route";
import lesson_route from "./lesson.route";
import logged_user_route from "./logged_user.route";
import role_route from "./role.route";
import user_route from "./user.route";

 const route = express.Router();

const PATH = {
  AUTH: "/auth",
  ROLE: "/role",
  USER: "/user/:id",
  LOGGED_USER: "/user",
  COURSE: "/course",
  STRIPE: "/stripe",
  COLLECTION: "/collection",
};

route.use(PATH.ROLE, role_route);
route.use(PATH.AUTH, auth_route);
route.use(PATH.USER, user_route);
route.use(PATH.LOGGED_USER, logged_user_route);
route.use(PATH.COURSE, course_route);
route.use(PATH.COLLECTION, collection_route);
route.use(lesson_route);
route.use(exercise_route);

export default route;
