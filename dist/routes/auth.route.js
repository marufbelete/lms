"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const bruteprotect_1 = __importDefault(require("../helpers/bruteprotect"));
const google_1 = require("../auth/google");
const config_1 = __importDefault(require("../config/config"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const route = express_1.default.Router({ mergeParams: true });
route.post("/signup", auth_controller_1.default.registerUser);
route.post("/login", bruteprotect_1.default.block, auth_controller_1.default.loginUser);
route.get("/profile", auth_middleware_1.authenticateJWT, auth_controller_1.default.authProfile);
route.post("/forum/login", bruteprotect_1.default.block, auth_controller_1.default.forumLogin);
route.put("/password", auth_middleware_1.authenticateJWT, bruteprotect_1.default.block, auth_controller_1.default.changePassword);
route.get("/google", passport_1.default.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
}));
route.use("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: `${config_1.default.FE_URL}/login`,
}), google_1.issueGoogleToken);
route.post("/logout", auth_controller_1.default.logoutUser);
route.post("/confirm", auth_controller_1.default.confirmEmail);
exports.default = route;
