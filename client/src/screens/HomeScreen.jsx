import React from "react";
import { products } from "../Data/products.js";
import Product from "../components/Product.jsx";
const HomeScreen = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 place-content-center mx-auto m-2">
			{products.map((product, index) => (
				<Product key={index} product={product} />
			))}
		</div>
	);
};

export default HomeScreen;
