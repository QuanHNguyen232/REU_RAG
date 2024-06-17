import {Router} from "express";
import { getAllUsers, getSignup } from "../controllers/user-controllers.js";
import { signupValidator, validate } from "../utils/validators.js";
  
const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), getSignup);

export default userRoutes;