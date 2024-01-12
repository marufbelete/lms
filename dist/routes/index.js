"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_route_1 = __importDefault(require("./role.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const stripe_route_1 = __importDefault(require("./stripe.route"));
// const user_route = require('./user.route');
// const logged_user_route = require('./logged_user.route');
// const course_route = require('./course.route');
// const lesson_route = require('./lesson.route');
// const exercise_route = require('./exercise.route');
const route = express_1.default.Router();
const PATH = {
    AUTH: '/auth',
    ROLE: '/role',
    USER: '/user/:id',
    LOGGED_USER: '/user',
    COURSE: '/course',
    STRIPE: '/stripe',
};
route.use(PATH.ROLE, role_route_1.default);
route.use(PATH.AUTH, auth_route_1.default);
route.use(PATH.STRIPE, stripe_route_1.default);
// route.use(PATH.USER,user_route)
// route.use(PATH.LOGGED_USER,logged_user_route)
// route.use(PATH.COURSE,course_route)
// route.use(lesson_route)
// route.use(exercise_route)
exports.default = route;
//# sourceMappingURL=index.js.map