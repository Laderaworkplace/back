import express from "express";
import {
  loginProfile,
  userRegistration,
} from "../controller/userController.js";

const userRouter = express.Router();
userRouter.post("/register", userRegistration);
userRouter.post("/login", loginProfile);

export default userRouter;
