import { registerUser, getUsers, login } from "../Controllers/userController.js";
import express from "express"


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", getUsers);
userRouter.post("/login", login);
export default userRouter;