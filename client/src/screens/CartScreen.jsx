import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../slices/cartSlice";

export default function CartScreen() {
	const { cartItems, taxPrice, shippingPrice, totalPrice, itemsPrice } =
		useSelector((state) => state.cart);
	const totalItems = cartItems.reduce((acc, item) => acc + +item.qty, 0);
	const navigate = useNavigate();
	const disPatch = useDispatch();

	const handleCheckout = () => {
		//navigate("/checkout")
	};
	const handleDeleteItem = (id) => {
		disPatch(removeFromCart(id));
	};
	return (
		<div className="w-full flex flex-col sm:flex-row  justify-around sm:justify-between gap-4 p-2 sm:p-4 ">
			<div className="flex flex-col gap-4 w-full sm:w-2/3 ">
				<div>
					<h1 className=" font-bold  text-2xl sm:text-3xl">
						Shipping Cart
					</h1>
				</div>
				{cartItems.length !== 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 lg:p-10 border-b-2 border-black sm:border-none ">
						{cartItems.map((item) => (
							<div
								className=" border border-gray-300 p-4 flex items-center"
								key={item._id}
							>
								<div>
									<img
										src={item.image}
										alt={item.name}
										className="w-16 h-16 object-contain mr-4"
									/>

									<h3 className=" text-lg font-semibold">
										{item.name}
									</h3>
									<p className=" text-gray-400 ">
										${item.price.toFixed(2)}
									</p>
									<p>Quantity: {item.qty}</p>
									<button
										onClick={() =>
											handleDeleteItem(item._id)
										}
										className="  text-red-500  "
									>
										Remove
									</button>
								</div>
							</div>
						))}
						{/* <div className=" w-[280px] sm:w-[350px] md:w-[250px] lg:w-[320px] xl:w-[350px] h-[100px]  border-2 border-gray-500 border-opacity-75"></div>
					<div className=" w-[280px] sm:w-[350px] md:w-[250px] lg:w-[320px] xl:w-[350px] h-[100px]  border-2 border-gray-500 border-opacity-75"></div>
					<div className=" w-[280px] sm:w-[350px] md:w-[250px] lg:w-[320px] xl:w-[350px] h-[100px]  border-2 border-gray-500 border-opacity-75"></div>
					<div className=" w-[280px] sm:w-[350px] md:w-[250px] lg:w-[320px] xl:w-[350px] h-[100px]  border-2 border-gray-500 border-opacity-75"></div>
					<div className=" w-[280px] sm:w-[350px] md:w-[250px] lg:w-[320px] xl:w-[350px] h-[100px]  border-2 border-gray-500 border-opacity-75"></div> */}
					</div>
				) : (
					<p>Your cart is empty!</p>
				)}
			</div>
			{cartItems.length !== 0 && (
				<div className="sm:w-1/3 w-full flex flex-col gap-2 p-2 bg-gray-200 h-fit">
					<h2 className=" font-bold text-lg">Subtotal</h2>
					<p className=" text-gray-500">Total Items: {totalItems}</p>
					<p className=" text-gray-500">Items Price:{itemsPrice}</p>
					<p className=" text-gray-500">Tax: {taxPrice} </p>
					<p className=" text-gray-500">
						Shipping Price:{shippingPrice}{" "}
					</p>
					<p className=" text-gray-500">Total Price:{totalPrice} </p>
					<button
						onClick={() => handleCheckout()}
						disabled={cartItems.length === 0}
						className="bg-blue-500 rounded-lg px-1.5 w-fit py-1 text-white hover:bg-blue-600"
					>
						Proceed to Checkout
					</button>
				</div>
			)}
		</div>
	);
}
