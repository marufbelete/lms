import express from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import bouncer from "../helpers/bruteprotect";
import { issueGoogleToken } from "../auth/google";
import config from "../config/config";
import { authenticateJWT } from "../middleware/auth.middleware";
const route = express.Router({ mergeParams: true });

route.post("/signup", AuthController.registerUser);
route.post("/login", bouncer.block, AuthController.loginUser);
route.get("/profile", authenticateJWT, AuthController.authProfile);
route.post("/forum/login", bouncer.block, AuthController.forumLogin);
route.put(
  "/password",
  authenticateJWT,
  bouncer.block,
  AuthController.changePassword
);
route.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  })
);
route.use(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.FE_URL}/login`,
  }),
  issueGoogleToken
);
route.post("/logout", AuthController.logoutUser);
route.post("/confirm", AuthController.confirmEmail);

export default route;
