import express, { Router } from "express";

import {
	loginUser,
	registerUser,
	updateUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	getUsers,
	updateUserByAdmin,
	getUserById,
	deleteUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers);
router.route("/logout").get(logoutUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router
	.route("/:id")
	.put(protect, admin, updateUserByAdmin)
	.get(protect, admin, getUserById)
	.delete(protect, admin, deleteUser);
router.route("/update").put(updateUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").patch(resetPassword);

export default router;
