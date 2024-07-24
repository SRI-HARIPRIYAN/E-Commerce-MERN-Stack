import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserByAdminMutation } from "../../slices/userApiSlilce";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const UserEditScreen = () => {
	const navigate = useNavigate();
	const { id: userId } = useParams();
	const [updateUserByAdmin, { isLoading }, refetch] =
		useUpdateUserByAdminMutation();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setisAdmin] = useState(false);

	const handleUpdateUser = async () => {
		try {
			const res = await updateUserByAdmin({
				name,
				email,
				isAdmin,
				userId,
			});
			navigate("/admin/users");
			toast.success(res.message);
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};
	return (
		<div className="w-full flex flex-col justify-center items-center mt-[100px]">
			<h2 className=" font-bold text-lg">Update User</h2>
			<form
				onSubmit={handleUpdateUser}
				className=" w-[280px] sm:w-[400px] flex flex-col gap-2"
			>
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
					<button onClick={handleUpdateUser}>Update</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</div>
	);
};

export default UserEditScreen;
