import { Router } from "express";
import passport from "passport";
import validateInput from "../validations/validate";
import UserController from "../controllers/user";
import Auth from "../middlewares/authenticate";

const userController = new UserController();
const authRouter = Router();

authRouter.post("/register", validateInput, userController.registerUser);
authRouter.get(
  "/register/verify/:token",
  Auth.verifyToken,
  userController.verifyUser
);
authRouter.post("/login", validateInput, userController.logInUser);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  userController.socialAuth
);
export default authRouter;
