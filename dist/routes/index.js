"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const collection_route_1 = __importDefault(require("./collection.route"));
const course_route_1 = __importDefault(require("./course.route"));
const exercise_route_1 = __importDefault(require("./exercise.route"));
const lesson_route_1 = __importDefault(require("./lesson.route"));
const logged_user_route_1 = __importDefault(require("./logged_user.route"));
const role_route_1 = __importDefault(require("./role.route"));
const user_route_1 = __importDefault(require("./user.route"));
const route = express_1.default.Router();
const PATH = {
    AUTH: "/auth",
    ROLE: "/role",
    USER: "/user/:id",
    LOGGED_USER: "/user",
    COURSE: "/course",
    STRIPE: "/stripe",
    COLLECTION: "/collection",
};
route.use(PATH.ROLE, role_route_1.default);
route.use(PATH.AUTH, auth_route_1.default);
route.use(PATH.USER, user_route_1.default);
route.use(PATH.LOGGED_USER, logged_user_route_1.default);
route.use(PATH.COURSE, course_route_1.default);
route.use(PATH.COLLECTION, collection_route_1.default);
route.use(lesson_route_1.default);
route.use(exercise_route_1.default);
exports.default = route;
//# sourceMappingURL=index.js.map