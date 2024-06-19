import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product.jsx";
const HomeScreen = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get("/api/products");
			setProducts(data);
		};
		fetchProducts();
	}, []);
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 place-content-center mx-auto m-2">
			{products.map((product, index) => (
				<Product key={index} product={product} />
			))}
		</div>
	);
};

export default HomeScreen;
