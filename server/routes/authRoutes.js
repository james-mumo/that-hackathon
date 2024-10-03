import express from "express";
import * as authController from "../controllers/authController.js";

const authRoutes = express.Router();

// Signup and login routes for students
authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);

// Signup and login routes for tutors
authRoutes.post("/tut/signup", authController.tutor_signup);
authRoutes.post("/tut/login", authController.tutor_login);

export default authRoutes;
