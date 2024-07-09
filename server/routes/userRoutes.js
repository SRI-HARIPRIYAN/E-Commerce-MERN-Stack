import express from "express";

import {
	loginUser,
	registerUser,
	updateUser,
	logoutUser,
	forgotPassword,
	resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUser);
router.route("/logout").post(logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").post(resetPassword);

export default router;
