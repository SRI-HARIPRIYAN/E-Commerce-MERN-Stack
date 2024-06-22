import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner.jsx";
import { useGetProductsQuery } from "../slices/productsApislice.js";
import Product from "../components/Product.jsx";
import { toast } from "react-toastify";

const HomeScreen = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

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
