import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/userApiSlilce";

const ResetPassword = () => {
	const { resetToken } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const [resetPassword] = useResetPasswordMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!password || !confirmPassword) {
			toast.error("Please enter the password");
		} else if (password !== confirmPassword) {
			toast.error("Passwords mismatch");
			setPassword("");
			setConfirmPassword("");
		} else {
			try {
				const res = await resetPassword({
					resetToken,
					password,
				}).unwrap();
				console.log(res.data);
				navigate("/");
				toast.success("Password reset successfully");
			} catch (error) {
				toast.error(error?.data?.message || error?.message);
			}
		}
	};

	return (
		<div className="w-full  flex justify-center items-center mx-auto ">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="resetform bg-slate-200 p-3 sm:p-10 h-fit flex flex-col gap-3 sm:gap-5 w-[280px] sm:w-[450px] shadow-md  shadow-slate-600"
			>
				<h2 className=" font-bold text-lg sm:text-2xl text-center">
					Reset Password
				</h2>
				<div className="flex flex-col gap-1">
					<label className="text-sm opacity-90" htmlFor="password">
						Password
					</label>
					<input
						className="border-2 text-md py-0.5 pl-2 border-slate-400 rounded-sm"
						type="text"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
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
						type="submit"
						className="bg-green-400 text-white px-1.5 py-1 rounded-md"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
