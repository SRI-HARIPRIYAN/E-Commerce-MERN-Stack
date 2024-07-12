import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [address, setAddress] = useState(shippingAddress?.address || "");
	const [city, setCity] = useState(shippingAddress?.city || "");
	const [postalcode, setPostalcode] = useState(
		shippingAddress?.postalcode || ""
	);
	const [country, setCountry] = useState(shippingAddress?.country || "");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handlePayment = (e) => {
		e.preventDefault();
		console.log(address, city, postalcode, country);
		dispatch(saveShippingAddress({ address, city, postalcode, country }));
		//navigate("/payment")
	};
	return (
		<div className="w-full h-full  ">
			<form className="w-[280px] sm:w-[400px] flex flex-col gap-4 sm:gap-6 m-auto border-2 rounded-lg  p-4 sm:p-8">
				<h2 className=" text-xl font-bold">Shipping</h2>
				<div className="flex flex-col gap-1.5">
					<label className="text-md text-sm" htmlFor="address">
						Address
					</label>
					<input
						className="py-0.5 pl-1 border-2 border-opacity-35  rounded-md border-gray-700"
						type="text"
						name="address"
						id="address"
						placeholder="D.no, Street name"
						onChange={(e) => setAddress(e.target.value)}
						value={address}
					/>
				</div>
				<div className="flex flex-col gap-1.5">
					<label className="text-sm" htmlFor="city">
						City
					</label>
					<input
						className="py-0.5 pl-1 border-2  border-opacity-35 rounded-md border-gray-700"
						type="text"
						name="city"
						id="city"
						placeholder="Enter your city"
						onChange={(e) => setCity(e.target.value)}
						value={city}
					/>
				</div>
				<div className="flex flex-col gap-1.5">
					<label className="text-sm" htmlFor="postalcode">
						Postal Code
					</label>
					<input
						className="py-0.5 pl-1 border-2  border-opacity-35 rounded-md border-gray-700"
						type="text"
						name="postalcode"
						id="postalcode"
						placeholder="Ex: 600001"
						onChange={(e) => setPostalcode(e.target.value)}
						value={postalcode}
					/>
				</div>
				<div className="flex flex-col gap-1.5">
					<label className="text-sm" htmlFor="country">
						Country
					</label>
					<input
						className="py-0.5 pl-1 border-2 border-opacity-35  rounded-md border-gray-700"
						type="text"
						name="country"
						id="country"
						placeholder="India"
						onChange={(e) => setCountry(e.target.value)}
						value={country}
					/>
				</div>
				<div className="text-center">
					<button
						className="bg-blue-600 rounded-md px-2 py-1 text-white hover:bg-blue-500"
						onClick={(e) => handlePayment(e)}
					>
						Proceed to payment
					</button>
				</div>
			</form>
		</div>
	);
};

export default ShippingScreen;
