import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useGetProductsQuery } from "../slices/productsApislice.js";
import Product from "../components/Product.jsx";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants.js";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/userSlice.js";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const { data: products, isLoading, error } = useGetProductsQuery();
	const getUser = async () => {
		try {
			const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
				withCredentials: true,
			});
			console.log(res.data);
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
		console.log(error.message);
	}

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<h1>{} </h1>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 place-content-center mx-auto m-2">
					{products.map((product, index) => (
						<Product key={index} product={product} />
					))}
				</div>
			)}
		</>
	);
};

export default HomeScreen;
