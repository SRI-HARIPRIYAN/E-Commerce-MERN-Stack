import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice.js";
export default function PaymentScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [paymentMethod, setPaymentMethod] = useState("");

	const handleContinue = () => {
		dispatch(savePaymentMethod(paymentMethod));
		//navigate("/place-order")
	};

	return (
		<div className=" absolute top-44 left-10 flex flex-col items-start gap-6 border-2 p-6 rounded-lg">
			<h3 className=" font-bold text-lg">Payment Method</h3>
			<div className="flex flex-col gap-1.5 ">
				<label>Select Payment type: </label>
				<div className="flex pl-4">
					<label htmlFor="stripe" className=" cursor-pointer">
						<input
							type="radio"
							name="stripe"
							id="stripe"
							value="Stripe or Credit card"
							onChange={(e) => setPaymentMethod(e.target.value)}
							checked={paymentMethod === "Stripe or Credit card"}
						/>
						<span className="pl-1">Stripe or Credit card</span>
					</label>
				</div>
			</div>
			<button
				onClick={handleContinue}
				className="bg-blue-500 text-white hover:bg-blue-400 px-1 py-1 rounded-lg"
			>
				Continue
			</button>
		</div>
	);
}
