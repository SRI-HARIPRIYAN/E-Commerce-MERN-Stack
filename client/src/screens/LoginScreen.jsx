import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLoginMutation } from "../slices/userApiSlilce.js";
import { setCredentials } from "../slices/userSlice.js";
import Spinner from "../components/Spinner.jsx";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isLoading }] = useLoginMutation();
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
	return (
		<div className="w-full  flex justify-center items-center mx-auto">
			<div className="loginform bg-slate-200 p-3 h-fit flex flex-col gap-3 w-[280px] shadow-md  shadow-slate-600">
				<h2 className=" font-bold text-lg text-center">Login</h2>
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
					<label className="text-sm opacity-90" htmlFor="password">
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
					<Link className=" text-blue-500 font-semibold" to="#">
						Forget password?
					</Link>
				</div>
				<div className="flex justify-around">
					<button
						onClick={(e) => handleLogin(e)}
						type="submit"
						className="bg-green-400 text-white px-1.5 py-0.5 rounded-lg"
						disabled={isLoading}
					>
						Login
					</button>
					<button
						type="button"
						className="bg-red-400 text-white px-1.5 py-0.5 rounded-lg"
					>
						Sign in with google
					</button>
				</div>
				{isLoading && <Spinner />}
				<div>
					<p>
						New user?
						<Link className="text-sm text-blue-500 " to="#">
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
