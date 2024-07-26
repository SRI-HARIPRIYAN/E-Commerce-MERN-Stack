import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { clearCartItems } from "../slices/cartSlice";
const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const {
		cartItems,
		shippingAddress: { address, city, postalCode, country },
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	} = cart;

	const [createOrder, { isLoading }] = useCreateOrderMutation();

	const handlePlaceOrder = async () => {
		try {
			const res = await createOrder({
				orderItems: cartItems,
				shippingAddress: { address, city, postalCode, country },
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			}).unwrap();
			navigate(`/orders/${res._id}`);
			dispatch(clearCartItems());
			toast.success("Order placed");
		} catch (err) {
			toast.error(err?.data?.message || err?.error);
		}
	};
	return (
		<div className="grid translate-y-24 grid-cols-1 sm:grid-cols-2 gap-4 w-[300px] sm:w-full mx-auto sm:pt-10 sm:pl-10 ">
			<section className="p-3 flex flex-col gap-2">
				<h2 className="font-bold text-lg">Place Order</h2>
				<div className="flex flex-col gap-2 p-1">
					<h3 className="font-semibold">Shipping Address:</h3>
					<p>
						{address}
						{city}
						{postalCode}
						{country}
					</p>
				</div>
				<div className="flex flex-col gap-2 p-1">
					<h3 className="font-semibold">Payment method:</h3>
					<p>{paymentMethod}</p>
				</div>
			</section>
			<section className=" bg-gray-200 p-3 flex flex-col gap-3 sm:w-[400px] mx-auto">
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
							{cartItems.map((item) => (
								<tr
									key={item._id}
									className="border-b-2 border-gray-400"
								>
									<td className="font-light ">{item.name}</td>
									<td className="font-light  text-center ">
										{item.qty}
									</td>
									<td className="font-light text-right">
										{item.price * item.qty}
									</td>
								</tr>
							))}
							<tr className=" border-b-2 border-gray-400">
								<td className=" ">Shipping</td>
								<td className=" "></td>
								<td className="text-right">{shippingPrice}</td>
							</tr>
							<tr className=" border-b-2 border-gray-400">
								<td className=" ">Tax</td>
								<td className=" "></td>
								<td className="text-right">{taxPrice}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className=" text-right font-bold">
					<span>Total: {totalPrice}</span>
				</div>
				<button
					disabled={isLoading}
					onClick={handlePlaceOrder}
					className=" bg-yellow-500 rounded-md py-1 text-white hover:bg-yellow-400"
				>
					Place Order
				</button>
			</section>
			{isLoading && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default PlaceOrderScreen;
