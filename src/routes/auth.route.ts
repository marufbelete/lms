import express from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import { errorHandler } from "../middleware/errohandling.middleware";
import bouncer from "../helpers/bruteprotect";
import { issueGoogleToken } from "../auth/google";
import config from "../config/config";
import { authenticateJWT } from "../middleware/auth.middleware";
const route = express.Router({ mergeParams: true });

route.post("/signup", AuthController.registerUser, errorHandler);

route.post("/login", bouncer.block, AuthController.loginUser, errorHandler);

route.get(
  "/profile",
  authenticateJWT,
  AuthController.authProfile,
  errorHandler
);

route.post(
  "/forum/login",
  bouncer.block,
  AuthController.forumLogin,
  errorHandler
);

route.put(
  "/password",
  authenticateJWT,
  bouncer.block,
  AuthController.changePassword,
  errorHandler
);

route.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  })
);

//issue token on success
route.use(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${config.FE_URL}/dashboard`,
    failureRedirect: `${config.FE_URL}/login`,
  }),
  issueGoogleToken,
  errorHandler
);

route.post("/logout", AuthController.logoutUser, errorHandler);

route.get("/confirm", AuthController.confirmEmail, errorHandler);

export default route;
