import React from "react";
import {
	useGetOrderDetailsQuery,
	usePayWithStripeMutation,
	useDeliverOrderMutation,
} from "../slices/orderApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";

const OrderScreen = () => {
	const navigate = useNavigate();
	const { id: orderId } = useParams();
	const { userInfo } = useSelector((state) => state.user);
	const {
		data: order,
		isLoading,
		error,
		refetch,
	} = useGetOrderDetailsQuery(orderId);

	const [payWithStripe, { isLoading: loadingStripe }] =
		usePayWithStripeMutation();
	const [deliverOrder, { isLoading: deliverLoading }] =
		useDeliverOrderMutation();

	if (error) {
		return toast.error(error.message);
	}
	if (isLoading) {
		return <Spinner />;
	}
	const {
		shippingAddress,
		taxPrice,
		shippingPrice,
		user,
		isDelivered,
		orderItems,
	} = order;

	const calculateTotal = (orderItems) => {
		return orderItems.reduce(
			(acc, item) => acc + item.price * item.qty + taxPrice,
			0
		);
	};

	const handleStripePayment = async (orderItems) => {
		try {
			const res = await payWithStripe(orderItems).unwrap();
			window.location.href = res.url;
		} catch (err) {
			toast.error(err?.data?.message || err?.error);
		}
	};
	const handleOrderDeliver = async (orderId) => {
		await deliverOrder(orderId);
		refetch();
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-[300px] sm:w-full mx-auto sm:pt-10 sm:pl-10 ">
			<section className="p-3 flex flex-col gap-2">
				<h2 className="font-bold text-lg sm:text-xl">Order Details</h2>
				<div className="flex flex-col gap-2 p-2">
					<h3 className="font-bold">Order Number:</h3>
					<p>{orderId}</p>
				</div>
				<div className="flex flex-col gap-2 p-2">
					<h3 className="font-bold">Shipping Details:</h3>
					<p>
						<span className=" font-semibold">Name:</span>{" "}
						{user.name}
					</p>
					<p>
						<span className=" font-semibold">Email:</span>{" "}
						{user.email}
					</p>
					<p>
						<span className=" font-semibold">Address:</span>{" "}
						{shippingAddress.address}
					</p>
				</div>
				<div className="flex flex-col gap-2 p-2">
					<h3 className="font-bold">Order Status:</h3>
					<p
						className={`${
							isDelivered ? "text-green-500" : "text-red-500"
						}`}
					>
						{isDelivered ? "Delivered" : "Not Delivered"}
					</p>
				</div>
				{deliverLoading && <Spinner />}
			</section>
			<section className=" bg-gray-200 p-3 flex flex-col h-fit gap-3 sm:gap-5 sm:w-[400px] mx-auto">
				<h2 className=" font-bold text-lg">Order Summary</h2>
				<div>
					<table className=" w-full">
						<thead>
							<tr>
								<th className="font-semibold ">Product</th>
								<th className="font-semibold ">Quantity</th>
								<th className="font-semibold">Price</th>
							</tr>
						</thead>
						<tbody>
							{orderItems?.map((item) => (
								<tr
									key={item._id}
									className=" border-b-2 border-gray-400"
								>
									<td className=" font-light text-md ">
										{item.name}
									</td>
									<td className=" font-light text-md ">
										{item.qty}
									</td>
									<td className=" font-light text-md">
										${(item.price * item.qty).toFixed(2)}
									</td>
								</tr>
							))}
							<tr className=" border-b-2 border-gray-400">
								<td className=" font-light text-md ">
									Shipping
								</td>
								<td className=" font-light text-md "></td>
								<td className=" font-light text-md">
									${shippingPrice}
								</td>
							</tr>
							<tr className=" border-b-2 border-gray-400">
								<td className=" font-light text-md ">Tax</td>
								<td className=" font-light text-md "></td>
								<td className=" font-light text-md">
									${taxPrice}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="text-right font-bold">
					<span>Total: {calculateTotal(orderItems).toFixed(2)}</span>
				</div>
				<div className="flex gap-2 justify-start">
					<button
						onClick={() => handleStripePayment(orderItems)}
						className=" bg-blue-500 rounded-md py-1 px-1 text-white hover:bg-green-700"
					>
						Pay with Stripe
					</button>

					{userInfo.isAdmin && !order.isDelivered && (
						<button
							onClick={() => handleOrderDeliver(orderId)}
							className=" bg-black rounded-md py-1 px-1 text-white hover:bg-green-700"
						>
							Mark as Delivered
						</button>
					)}
				</div>
				{loadingStripe && <Spinner />}
			</section>
			{/* {isLoading && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Spinner />
				</div>
			)} */}
		</div>
	);
};

export default OrderScreen;
