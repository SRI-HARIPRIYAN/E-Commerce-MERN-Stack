import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetUserByIdQuery,
	useUpdateUserByAdminMutation,
} from "../../slices/userApiSlilce";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const UserEditScreen = () => {
	const navigate = useNavigate();
	const { id: userId } = useParams();
	const {
		data: user,
		isLoading: userLoading,
		error,
	} = useGetUserByIdQuery(userId);
	const [updateUserByAdmin, { isLoading }, refetch] =
		useUpdateUserByAdminMutation();

	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [isAdmin, setisAdmin] = useState(user?.isAdmin || false);

	const handleUpdateUser = async () => {
		try {
			const res = await updateUserByAdmin({
				name,
				email,
				isAdmin,
				userId,
			});
			toast.success(res.message);
			navigate("/admin/users");
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setisAdmin(user.isAdmin);
		}
	}, [user]);
	if (userLoading || isLoading) return <Spinner />;
	return (
		<div className="w-full flex flex-col justify-center items-center mt-[100px]">
			<h2 className=" font-bold text-lg">Update User</h2>
			<form className=" w-[280px] sm:w-[400px] flex flex-col gap-2">
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="email">E-mail</label>
					<input
						type="email"
						id="email"
						name="email"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="flex p-1 gap-3 justify-start">
					<label htmlFor="isAdmin">Admin:</label>
					<input
						type="checkbox"
						id="isAdmin"
						name="isAdmin"
						className="w-4  text-blue-800 "
						checked={isAdmin}
						onChange={(e) => setisAdmin(e.target.checked)}
					/>
				</div>
				<div className=" bg-blue-500 w-fit px-1 py-1 text-white rounded-md">
					<button type="submit" onClick={handleUpdateUser}>
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserEditScreen;
