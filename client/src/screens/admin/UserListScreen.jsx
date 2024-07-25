import React from "react";
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../../slices/userApiSlilce";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

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
		<div className=" h-full p-4 w-full overflow-x-scroll ">
			<div className="">
				<h2 className="text-lg font-bold">Users List </h2>
			</div>
			<table className="w-fit  mx-auto mt-4 ">
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
						<tr key={user._id} className="border-2 ">
							<td className="border-2 py-1 px-3 text-center ">
								{user._id}
							</td>
							<td className="border-2 py-1 px-3 text-center ">
								{user.name}
							</td>
							<td className="border-2 py-1 px-3 text-center ">
								{user.email}
							</td>
							<td className="border-2 py-1 px-3 text-center ">
								{user.isAdmin ? "Admin" : "No"}
							</td>

							{!user.isAdmin && (
								<td className="border-2 border-collapse py-1 px-3 text-center flex justify-around items-center gap-3">
									<button
										onClick={() => handleUserEdit(user._id)}
										className="text-blue-400"
									>
										Edit
									</button>
									<button
										onClick={() =>
											handleDeleteUser(user._id)
										}
										className="text-red-400"
									>
										Delete
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserListScreen;
