import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlilce";
import { logout } from "../slices/userSlice";

const Header = () => {
	const { keyword: urlKeyword } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutApi] = useLogoutMutation();

	const [keyword, setKeyword] = useState(urlKeyword || "");
	const [isAsideClicked, setIsAsideClicked] = useState(false);
	const [isProfileClicked, setIsProfileClicked] = useState(false);
	const [isAdminClicked, setAdminClicked] = useState(false);

	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);

	const handleLogout = async () => {
		try {
			await logoutApi().unwrap();
			dispatch(logout());
			navigate("/login");
			toast.success("Logged out successfully");
		} catch (error) {
			toast.error(error?.data?.message || error?.message);
		}
	};

	const showProfileNavBar = () => (
		<div className="relative">
			<div
				className="cursor-pointer"
				onClick={() => setIsProfileClicked((prevState) => !prevState)}
			>
				<MdOutlinePersonOutline className="inline" /> {userInfo?.name}
				{isProfileClicked ? (
					<RiArrowDropUpLine className="inline text-xl " />
				) : (
					<RiArrowDropDownLine className="inline text-xl " />
				)}
			</div>
			{isProfileClicked && (
				<div
					className="absolute
						 bg-slate-500 translate-y-1 p-1.5  rounded-md  text-center w-full text-white"
				>
					<div className="cursor-pointer hover:bg-slate-600 rounded-md py-0.5">
						<MdOutlinePersonOutline className="inline" />
						<Link to="/profile" className="inline">
							Profile
						</Link>
					</div>
					<Link
						onClick={handleLogout}
						className="cursor-pointer hover:bg-slate-600 rounded-md py-0.5"
					>
						<TbLogout2 className="inline" /> Logout
					</Link>
				</div>
			)}
		</div>
	);

	const showAdminNavBar = () => (
		<div className="relative">
			<div
				className="cursor-pointer"
				onClick={() => setAdminClicked((prevState) => !prevState)}
			>
				<MdOutlinePersonOutline className="inline" /> {userInfo?.name}
				{isAdminClicked ? (
					<RiArrowDropUpLine className="inline text-xl " />
				) : (
					<RiArrowDropDownLine className="inline text-xl " />
				)}
			</div>
			{isAdminClicked && (
				<div
					className="absolute flex flex-col
						 bg-slate-500 translate-y-1 p-1.5  rounded-md  text-center w-full text-white"
				>
					<Link
						to="/admin/users"
						className="cursor-pointer hover:bg-slate-600 rounded-md py-0.5"
					>
						Users
					</Link>

					<Link
						to="/admin/products"
						className="cursor-pointer hover:bg-slate-600 rounded-md py-0.5"
					>
						Products
					</Link>
					<Link
						to="/admin/orders"
						className="cursor-pointer hover:bg-slate-600 rounded-md py-0.5"
					>
						Orders
					</Link>
				</div>
			)}
		</div>
	);

	const handleSearch = (e) => {
		e.preventDefault();
		if (keyword) {
			navigate(`/search/${keyword.trim()}`);
			setKeyword("");
		} else {
			navigate("/");
		}
	};

	return (
		<header className="w-full bg-slate-800 h-16 flex justify-between p-1 md:p-2 md:px-6 items-center gap-1.5 text-white ">
			<div className="flex justify-between items-center gap-1 md:gap-3">
				<Link
					to="/"
					className="text-2xl md:text-3xl text-nowrap  font-extrabold "
				>
					Eco-cart
				</Link>
				<div className=" ml-2 md:ml-10 flex items-center gap-1 md:gap-3">
					<input
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						type="text"
						className="w-32 md:h-7 md:w-44 bg-gray-500"
					/>
					<button
						onClick={handleSearch}
						className="bg-sky-400 px-1 rounded-sm md:py-0.5 "
					>
						search
					</button>
				</div>
			</div>
			<div className="hidden md:flex md:items-center gap-2 ">
				<Link to="/cart" className=" cursor-pointer">
					<TiShoppingCart className="inline " /> Cart
					<span className="bg-sky-300 rounded-full px-2 ml-1">
						{cartItems.length}
					</span>
				</Link>
				{userInfo && showProfileNavBar()}
				{!userInfo && (
					<div>
						<Link to="/login">Login</Link>
					</div>
				)}
				{userInfo?.isAdmin && showAdminNavBar()}
			</div>
			<div
				onClick={() => setIsAsideClicked((prevState) => !prevState)}
				className="md:hidden text-3xl cursor-pointer -translate-y-1 -translate-x-1 "
			>
				&#8801;
			</div>
			{isAsideClicked && (
				<div className=" w-full left-0 flex flex-col md:hidden justify-around h-fit items-center bg-slate-600 text-inherit absolute text-black top-[64px]">
					{userInfo?.isAdmin && showAdminNavBar()}
					{userInfo && (
						<Link
							to="/profile"
							className=" border-t-2 w-[90%] border-white border-opacity-45 py-2  text-center"
						>
							<MdOutlinePersonOutline className="inline mr-1" />
							{userInfo?.name}
						</Link>
					)}
					{!userInfo && (
						<Link
							to="/login"
							className="text-center  border-t-2 w-[90%] border-white border-opacity-45 py-2 "
						>
							Login
						</Link>
					)}

					<Link
						to="/cart"
						className="border-t-2 w-[90%] border-white  border-opacity-45 text-center py-2 "
					>
						<TiShoppingCart className="inline mr-1" /> Cart
						<span className="bg-sky-300 rounded-full px-1 ml-1 ">
							{cartItems.length}
						</span>
					</Link>
					{userInfo && (
						<button
							onClick={handleLogout}
							className="text-center  border-t-2 w-[90%] border-white border-opacity-45 py-2 "
						>
							<TbLogout2 className="inline mr-1" />
							<span>Logout</span>
						</button>
					)}
				</div>
			)}
		</header>
	);
};

export default Header;
