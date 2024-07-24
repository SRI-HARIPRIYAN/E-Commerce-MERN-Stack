import React from "react";
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../../slices/userApiSlilce";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserListScreen = () => {
	const navigate = useNavigate();
	const { data: users, isLoading, error, refetch } = useGetUsersQuery();
	const [deleteUser] = useDeleteUserMutation();
	const handleUserEdit = (id) => {
		navigate(`/admin/users/${id}/edit`);
	};
	if (isLoading) return <Spinner />;
	if (error) {
		toast.error(error?.data?.message || error?.error);
	}
	const handleDeleteUser = async (id) => {
		try {
			if (window.confirm("Are you sure to delete the user")) {
				const res = await deleteUser(id);
				toast.success(res.message);
				refetch;
			}
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};
	return (
		<div className=" h-full p-4 ">
			<div className="">
				<h2 className="text-lg font-bold">Users List </h2>
			</div>
			<table className="w-full mx-auto mt-4  ">
				<thead className="bg-gray-300">
					<tr>
						<th className="border-2">ID</th>
						<th className="border-2">NAME</th>
						<th className="border-2">E-MAIL</th>
						<th className="border-2">IS ADMIN</th>
						<th className="border-2">ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr key={user._id}>
							<td className="border-2 py-1 px-3 text-center whitespace-nowrap">
								{user._id}
							</td>
							<td className="border-2  py-1 px-3 text-center whitespace-wrap">
								{user.name}
							</td>
							<td className="border-2 py-1 px-3 text-center whitespace-nowrap">
								{user.email}
							</td>
							<td className="border-2 py-1 px-3 text-center whitespace-nowrap">
								{user.isAdmin ? "Admin" : "No"}
							</td>

							<td className="border-2 py-1 px-3 text-center flex justify-around items-center gap-3">
								<button
									onClick={() => handleUserEdit(user._id)}
									className="text-blue-400"
								>
									Edit
								</button>
								<button
									onClick={() => handleDeleteUser(user._id)}
									className="text-red-400"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserListScreen;
