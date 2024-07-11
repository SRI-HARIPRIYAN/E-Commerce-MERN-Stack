import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../slices/userApiSlilce.js";
import { setCredentials } from "../slices/userSlice.js";
import Spinner from "../components/Spinner.jsx";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [register, { isLoading }] = useRegisterMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate("/");
				toast.success("Register successfull");
			} catch (error) {
				toast.error(error?.data?.message || error?.message);
			}
		}
	};

	return (
		<div className="w-full  flex justify-center items-center mx-auto ">
			{isLoading ? (
				<Spinner />
			) : (
				<div className="loginform bg-slate-200 p-3 sm:p-10 h-fit flex flex-col gap-3 sm:gap-5 w-[280px] sm:w-[450px] shadow-md  shadow-slate-600">
					<h2 className=" font-bold text-lg sm:text-2xl text-center">
						Register
					</h2>
					<div className="flex flex-col gap-1">
						<label className="text-sm opacity-90" htmlFor="name">
							Name
						</label>
						<input
							className="border-2 text-md py-0.5 pl-2 border-slate-400 rounded-sm"
							type="name"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
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
					<div className="flex flex-col gap-1">
						<label
							className="text-sm opacity-90"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							className="border-2 py-0.5  pl-2 border-slate-400  rounded-sm "
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></input>
					</div>

					<div className="flex justify-around sm:justify-center sm:gap-5">
						<button
							onClick={(e) => handleRegister(e)}
							type="submit"
							className="bg-green-400 text-white px-1.5 py-1 rounded-md"
							disabled={isLoading}
						>
							Register
						</button>
						<button
							type="button"
							className="bg-red-400 text-white px-1.5 py-1 rounded-md"
						>
							Sign up with google
						</button>
					</div>

					<div>
						<p>
							Already a user?{" "}
							<Link
								className="text-sm text-blue-500 "
								to="/login"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default RegisterScreen;
