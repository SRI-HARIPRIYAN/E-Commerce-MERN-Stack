import React from "react";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import { Link } from "react-router-dom";
const OrderListScreen = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();
	return (
		<div className="w-full h-full ">
			<h2>Order List</h2>
			<table className=" w-4/5 mx-auto">
				<thead className="bg-gray-300">
					<tr>
						<th className="border-2">Order ID</th>
						<th className="border-2">User</th>
						<th className="border-2">Date</th>
						<th className="border-2">Total</th>
						<th className="border-2">Delivered</th>
						<th className="border-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((order) => (
						<tr key={order._id}>
							<td className="border-2 py-1 text-center">
								{order._id}
							</td>
							<td className="border-2 py-1 text-center">
								{order.user?.name}
							</td>
							<td className="border-2 py-1 text-center">
								{order.createdAt.slice(0, 10)}
							</td>
							<td className="border-2 py-1 text-center">
								{order.totalPrice}
							</td>
							<td className="border-2 py-1 text-center">
								{order.isDelivered ? "Yes" : "No"}
							</td>
							<td className="border-2 py-1 text-center">
								<Link
									className="bg-blue-500 w-fit  text-white px-1.5 my-auto  py-0.5"
									to={`/orders/${order._id}`}
								>
									<button>View Details</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrderListScreen;
