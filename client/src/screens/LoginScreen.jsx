import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
	useForgotPasswordMutation,
	useLoginMutation,
} from "../slices/userApiSlilce.js";
import { setCredentials } from "../slices/userSlice.js";
import Spinner from "../components/Spinner.jsx";
import { BACKEND_URL } from "../constants.js";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isLoading }] = useLoginMutation();
	const [forgotPassword, { isLoading: isPasswordLoading }] =
		useForgotPasswordMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
			toast.success("Login successfull");
		} catch (error) {
			toast.error(error?.data?.message || error?.message);
		}
	};

	const handleForgotPassword = async () => {
		if (!email) {
			alert("Please enter the email");
		} else {
			try {
				const res = await forgotPassword({ email }).unwrap();
				toast.success(res.message);
			} catch (error) {
				toast.error(error?.data?.message || error?.message);
			}
		}
	};

	const handleGoogleAuth = () => {
		try {
			window.location.href = `${BACKEND_URL}/auth/google/callback`;
		} catch (error) {
			toast.error(error?.data?.message || error?.message);
		}
	};

	return (
		<div className="w-full  flex justify-center items-center mx-auto ">
			{isLoading || isPasswordLoading ? (
				<Spinner />
			) : (
				<div className="loginform bg-slate-200 p-3 sm:p-10 h-fit flex flex-col gap-3 sm:gap-5 w-[280px] sm:w-[450px] shadow-md  shadow-slate-600">
					<h2 className=" font-bold text-lg sm:text-2xl text-center">
						Login
					</h2>
					<div className="flex flex-col gap-1">
						<label className="text-sm opacity-90" htmlFor="email">
							Email
						</label>
						<input
							className="border-2 text-md py-0.5 pl-2 border-slate-400 rounded-sm"
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							className="text-sm opacity-90"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="border-2 py-0.5  pl-2 border-slate-400  rounded-sm "
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<div>
						<p
							onClick={() => handleForgotPassword()}
							className=" cursor-pointer text-blue-500 font-semibold"
						>
							Forgot password?
						</p>
					</div>
					<div className="flex justify-around sm:justify-center sm:gap-5">
						<button
							onClick={(e) => handleLogin(e)}
							type="submit"
							className="bg-green-400 text-white px-1.5 py-1 rounded-md"
							disabled={isLoading}
						>
							Login
						</button>
						<button
							onClick={handleGoogleAuth}
							type="button"
							className="bg-red-400 text-white px-1.5 py-1 rounded-md"
						>
							Sign in with google
						</button>
					</div>

					<div>
						<p>
							New user?{" "}
							<Link
								className="text-sm text-blue-500 "
								to="/register"
							>
								Register here
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginScreen;
