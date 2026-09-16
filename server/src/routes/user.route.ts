import { Hono } from "hono";
import {
  signIn,
  signUp,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";

const userRoute = new Hono();

userRoute.post("/signup", signUp);
userRoute.post("/signin", signIn);
userRoute.get("/verify", verifyEmail);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);

export default userRoute;
