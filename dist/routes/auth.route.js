"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const bruteprotect_1 = __importDefault(require("../helpers/bruteprotect"));
const config_1 = __importDefault(require("../config/config"));
const route = express_1.default.Router({ mergeParams: true });
route.post('/signup', auth_controller_1.registerUser, errohandling_middleware_1.errorHandler);
route.post('/login', bruteprotect_1.default.block, auth_controller_1.loginUser, errohandling_middleware_1.errorHandler);
route.post('/loginLocal', passport_1.default.authenticate('local', {}), function (req, res) {
    res.json(req.user);
}, errohandling_middleware_1.errorHandler);
// route.put('/password',
//     bouncer.block,
//     changePassword,
//     errorHandler)
route.get("/google", passport_1.default.authenticate("google", {
    // session: false,
    scope: ["email", "profile"],
}));
//issue token on success
route.use("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: `${config_1.default.FE_URL}/dashboard`,
    failureRedirect: "/failure"
}), 
// issueGoogleToken,
errohandling_middleware_1.errorHandler);
route.post('/logout', auth_controller_1.logoutUser, errohandling_middleware_1.errorHandler);
// route.get('/confirm',
//     confirmEmail,
//     errorHandler)
exports.default = route;
// Passport JS conveniently provides a “req.isAuthenticated()” function, that
// returns “true” in case an authenticated user is present in “req.session.passport.user”, or
// returns “false” in case no authenticated user is present in “req.session.passport.user”.
//# sourceMappingURL=auth.route.js.map