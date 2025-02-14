import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendMail from "../utils/sendEmail.js";
import crypto from "crypto";
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	generateToken(res, user._id);
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error("invalid email or password");
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exist");
	}
	const user = await User.create({
		name,
		email,
		password,
	});
	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Credentials");
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const { _id, name, email, password } = req.body;

	const user = await User.findById(_id);
	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		if (password) user.password = password;
		await user.save();
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const logoutUser = asyncHandler((req, res) => {
	try {
		res.cookie("jwt", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		/* res.cookie("connect.sid", "", {
			httpOnly: true,
			expires: new Date(0),
		}); */
		res.status(200).json({
			message: "Logged out successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error?.message });
	}
});
6;
const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}
	const resetToken = user.createPasswordResetToken();

	user.save();

	const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
	const message = `Hi ${user.name} Please follow this link to change your password: ${resetUrl}`;
	try {
		await sendMail({
			email: user.email,
			subject: "Your password reset Token is valid for 10 mins",
			message,
			//name: user.name,
		});
		res.status(200).json({
			message: "Token sent to mail",
		});
	} catch (error) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		user.save();
		console.log(error);
		res.status(500).json({
			status: "error",
			message: "Something went wrong please try again later..",
		});
	}
});
const resetPassword = asyncHandler(async (req, res) => {
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400).json({
			status: "fail",
			message: "Invalid token or token expired",
		});
	}
	user.password = req.body.password;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	user.save();

	generateToken(res, user._id);

	res.status(201).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	});
});

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(req.body.isAdmin);
		await user.save();
		res.json({ message: "User updated successfully" });
	} else {
		res.status(404);
		throw new Error("User not found!");
	}
});
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error("User NOt found!");
	}
});
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await User.deleteOne({ _id: req.params.id });
		res.status(204).json({ message: "User deleted" });
	} else {
		res.status(404);
		throw new Error("User NOt found!");
	}
});

export {
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
};
