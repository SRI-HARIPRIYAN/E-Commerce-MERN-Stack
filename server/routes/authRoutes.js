import express from "express";
import passport from "passport";
import axios from "axios";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

//authenticate the user using google
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: `${process.env.CLIENT_URL}login/failed`,
	})
);

//forward the response to google authentication server
router.get("/google", async (req, res) => {
	try {
		const response = await axios.get(
			"https://accounts.google.com/o/oauth2/v2/auth",
			{
				params: req.query,
			}
		);

		res.send(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.get("/login/success", async (req, res) => {
	if (req.user) {
		const userExists = await User.findOne({ email: req.user._json.email });
		if (userExists) {
			generateToken(res, userExists._id);
		} else {
			const newUser = new User({
				name: req.user._json.name,
				email: req.user._json.email,
				password: Date.now(), //dummy password
			});
			generateToken(res, newUser._id);
			await newUser.save();
		}
		res.status(201).json({
			user: { ...req.user, isAdmin: userExists?.isAdmin },
			message: "Successfully logged in",
			_id: userExists._id,
		});
	} else {
		res.status(403).json({
			message: "Not authorized",
		});
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401); //unauthorized
	throw new Error("Login failed");
});

router.get("/logout", (req, res) => {
	req.logout((error) => {
		if (error) {
			console.log(error);
		}
		res.redirect("/");
	});
});

export default router;
