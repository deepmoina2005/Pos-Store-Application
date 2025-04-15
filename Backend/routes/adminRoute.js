import express from "express";
import { isAuth, Login, Logout } from "../controllers/authController.js";
import adminAuth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", Login);
adminRouter.get("/is-auth", adminAuth, isAuth);
adminRouter.get("/logout", Logout);

export default adminRouter;