import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
const SuccessScreen = () => {
	return (
		<div className="w-[250px] flex flex-col items-center justify-center h-[250px] border-4 border-green-500 rounded-full p-2  text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<TiTick className="w-24 h-24 text-green-600 mx-auto" />
			<h2 className=" font-bold text-xl">Payment Successfull</h2>
			<p>Thanks for the purchase</p>
			<Link
				to="/"
				className=" bg-gray-600 dark:bg-slate-400 hover:bg-gray-800 text-white px-1 py-1 rounded-lg "
			>
				Home
			</Link>
		</div>
	);
};

export default SuccessScreen;
