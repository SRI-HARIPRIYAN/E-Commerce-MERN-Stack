import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import { useUpdateUserMutation } from "../slices/userApiSlilce";
import Spinner from "../components/Spinner.jsx";
import { setCredentials } from "../slices/userSlice.js";
const ProfileScreen = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.user);

	const [name, setName] = useState(userInfo.name);
	const [email, setEmail] = useState(userInfo.email);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { data: userOrders, isLoading, error } = useGetUserOrdersQuery();
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password do not match");
			return;
		}
		const res = await updateUser({
			_id: userInfo._id,
			name,
			email,
			password,
		}).unwrap();
		dispatch(setCredentials({ ...res }));
		toast.success("Profile updated successfully");
	};
	if (error) {
		return toast.error(error.message);
	}
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<div className=" w-full flex flex-col sm:flex-row sm:p-5">
			<div className=" w-full sm:w-2/5 lg:w-1/3">
				<h2 className="font-bold text-lg sm:text-xl">Profile</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<div className="flex flex-col p-1">
						<label className="font-semibold" htmlFor="name">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className=" border-2 border-gray-500 rounded-md p-1 pl-1 w-2/3 border-opacity-75"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col p-1">
						<label htmlFor="email" className="font-semibold">
							Email
						</label>
						<input
							className=" border-2 border-gray-500 rounded-md p-1 pl-1 w-2/3 border-opacity-75"
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col p-1">
						<label className="font-semibold" htmlFor="password">
							Password
						</label>
						<input
							className=" border-2 border-gray-500 rounded-md p-1 pl-1 w-2/3 border-opacity-75"
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col p-1">
						<label
							className="font-semibold"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							className=" border-2 border-gray-500 rounded-md p-1 pl-1 w-2/3 border-opacity-75"
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						disabled={isUpdating}
						onClick={handleSubmit}
						className="bg-blue-600 text-white w-fit px-1.5 py-1 rounded-md "
					>
						Update Profile
					</button>
					{isUpdating && <Spinner />}
				</form>
			</div>
			<div className="w-full sm:w-3/5 lg:w-2/3 p-2 flex flex-col gap-3 ">
				<h2 className="text-lg sm:text-xl font-bold">Your Orders</h2>
				<table className=" w-full">
					<thead>
						<tr>
							<th className="font-semibold border-2 ">
								Order ID
							</th>
							<th className="font-semibold border-2 ">Date</th>
							<th className="font-semibold border-2 ">Total</th>
							<th className="font-semibold border-2 ">
								Delivered
							</th>
						</tr>
					</thead>
					<tbody>
						{userOrders?.map((order) => (
							<tr key={order._id} className="border-2">
								<td className="font-semibold border-r-2 text-center ">
									{order._id}
								</td>
								<td className="font-semibold border-r-2 text-center ">
									{order.createdAt.slice(0, 10)}
								</td>
								<td className="font-semibold border-r-2 text-center ">
									{order.totalPrice}
								</td>
								<td className="font-semibold border-r-2 text-center ">
									{order.isDelivered ? "Yes" : "No"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{userOrders.length === 0 && (
					<p className="text-center">No orders</p>
				)}
			</div>
		</div>
	);
};

export default ProfileScreen;
