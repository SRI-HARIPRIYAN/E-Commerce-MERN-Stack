import React, { useState } from "react";

import { TiShoppingCart } from "react-icons/ti";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from "react-redux";

const Header = () => {
	const [isAsideClicked, setIsAsideClicked] = useState(false);
	const [isProfileClicked, setIsProfileClicked] = useState(false);

	const { cartItems } = useSelector((state) => state.cart);
	console.log(cartItems.length);
	return (
		<nav className="w-screen bg-slate-800 h-16 flex justify-between p-1 md:p-2 md:px-6 items-center gap-1.5  text-white ">
			<div className="flex  justify-between items-center gap-1 md:gap-3">
				<p className="text-2xl md:text-3xl text-nowrap  font-extrabold ">
					Eco-cart
				</p>
				<div className=" ml-2 md:ml-10 flex items-center gap-1 md:gap-3">
					<input
						type="text"
						className="w-32 md:h-7 md:w-44 bg-gray-500"
					/>
					<button className="bg-sky-400 px-1 rounded-sm md:py-0.5 ">
						search
					</button>
				</div>
			</div>
			<div className="hidden md:flex md:items-center gap-2 ">
				<button className=" cursor-pointer">
					<TiShoppingCart className="inline " /> Cart
					<span className="bg-sky-300 rounded-full px-2 ml-1">
						{cartItems.length}
					</span>
				</button>
				<div className="relative">
					<div
						className="cursor-pointer"
						onClick={() =>
							setIsProfileClicked((prevState) => !prevState)
						}
					>
						<MdOutlinePersonOutline className="inline" /> Profile
						{isProfileClicked ? (
							<RiArrowDropUpLine className="inline text-xl " />
						) : (
							<RiArrowDropDownLine className="inline text-xl " />
						)}
					</div>
					{isProfileClicked && (
						<div
							className="absolute
						 bg-black translate-y-1 py-1 rounded-lg  text-center w-full text-white"
						>
							<div className="cursor-pointer">hello</div>
							<div className="cursor-pointer">
								<TbLogout2 className="inline" /> Logout
							</div>
						</div>
					)}
				</div>

				<button>Signin</button>
			</div>
			<div
				onClick={() => setIsAsideClicked((prevState) => !prevState)}
				className="md:hidden text-3xl cursor-pointer -translate-y-1 -translate-x-1 "
			>
				&#8801;
			</div>
			{isAsideClicked && (
				<div className=" w-full left-0 flex flex-col md:hidden justify-around h-fit items-center bg-slate-600 text-inherit absolute text-black top-[64px]">
					<button className="border-top-2 border-white py-2 ">
						<TiShoppingCart className="inline " /> Cart
						<span className="bg-sky-300 rounded-full px-2 ml-1">
							{cartItems.length}
						</span>
					</button>
					<button className="border-t-2 w-[90%] border-white border-opacity-45 py-2 ">
						<MdOutlinePersonOutline className="inline" /> Profile
					</button>
					<button className="  border-t-2 w-[90%] border-white border-opacity-45 py-2 ">
						<span className=" ml-3">Signin</span>
					</button>
				</div>
			)}
		</nav>
	);
};

export default Header;
