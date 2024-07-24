import React from "react";
import { useGetUsersQuery } from "../../slices/userApiSlilce";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
	const navigate = useNavigate();
	const { data: users, isLoading, error } = useGetUsersQuery();
	const handleUserEdit = (id) => {
		navigate(`/admin/users/${id}/edit`);
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
								<button className="text-red-400">Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserListScreen;
