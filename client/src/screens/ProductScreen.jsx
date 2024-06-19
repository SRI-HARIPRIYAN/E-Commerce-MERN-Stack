import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const ProductScreen = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();
	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			setProduct(data);
		};
		fetchProduct();
	}, [id]);

	return (
		<div className="w-full h-fit text-black   p-2 sm:p-5 mx-auto">
			<Link
				to="/"
				className=" bg-gray-600 dark:bg-slate-400 hover:bg-gray-800 text-white p-2 rounded-lg "
			>
				GoBack
			</Link>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
				<div className=" grid place-content-center ">
					<img
						className="shadow-md shadow-gray-500 lg:max-w-[500px]"
						src={product.image}
						alt={product.name}
					/>
				</div>
				<div className="flex flex-col gap-2 p-2">
					<div>
						<p className=" font-bold text-center sm:text-2xl">
							{product.name}
						</p>
					</div>
					<div>
						<p className=" text-opacity-70 text-sm indent-5 sm:text-lg sm:indent-10">
							{product.description}
						</p>
					</div>
					<div>
						<span>
							Rating {product.rating}
							<span className=" text-yellow-500">&#10031;</span>
						</span>
						<span className="text-sm">{`(${product.numReviews}Reviews)`}</span>
					</div>
					<div>
						<p>In Stock: {product.countInStock}</p>
					</div>
					<div>
						<span>Quantity</span>
						<select className="px-2  border-2 border-gray-400 rounded-sm ml-1">
							{[...Array(product.countInStock).keys()].map(
								(num) => (
									<option key={num + 1} value={num + 1}>
										{num + 1}
									</option>
								)
							)}
						</select>
					</div>
					<div>
						<button className="bg-yellow-600 hover:bg-yellow-500 py-1 px-2 rounded-lg">
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductScreen;
