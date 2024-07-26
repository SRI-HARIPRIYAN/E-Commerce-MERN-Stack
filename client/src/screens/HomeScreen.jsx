import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useGetProductsQuery } from "../slices/productsApislice.js";
import Product from "../components/Product.jsx";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants.js";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/userSlice.js";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";

const HomeScreen = () => {
	const { keyword, pageNumber } = useParams();
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetProductsQuery({
		keyword,
		pageNumber,
	});
	const getUser = async () => {
		try {
			const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
				withCredentials: true,
			});

			dispatch(
				setCredentials({
					...res.data.user._json,
					_id: res.data._id, //error?

					isAdmin: res.data.user.isAdmin,
				})
			);
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	if (isLoading) return <Spinner />;
	if (error) {
		toast.error(error?.data?.message || error?.error);
	}

	return (
		<div className="w-screen p-2 ">
			<div className="  grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 place-content-center mx-auto m-2 ">
				{data?.products?.map((product, index) => (
					<Product key={index} product={product} />
				))}
			</div>
			<div className="flex justify-center mt-12">
				<Paginate
					pages={data.pages}
					page={data.pageNumber}
					keyword={keyword ? keyword : ""}
				/>
			</div>
		</div>
	);
};

export default HomeScreen;
