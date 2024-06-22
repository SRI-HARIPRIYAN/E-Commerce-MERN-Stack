import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import { useGetProductDetailsQuery } from "../slices/productsApislice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice.js";
const ProductScreen = () => {
	const { id: productId } = useParams();
	const [qty, setQty] = useState(1);
	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
	};
	return (
		<div className="w-full h-fit text-black   p-2 sm:p-5 mx-auto">
			<Link
				to="/"
				className=" bg-gray-600 dark:bg-slate-400 hover:bg-gray-800 text-white p-2 rounded-lg "
			>
				GoBack
			</Link>
			{isLoading ? (
				<Spinner />
			) : error ? (
				toast.error(error?.data?.message || error?.error)
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
					<div className=" grid place-content-center ">
						<img
							className="shadow-md shadow-gray-500 lg:max-w-[500px] "
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
							<span className=" font-bold">${product.price}</span>
						</div>
						<div>
							<span>
								Rating {product.rating}
								<span className=" text-yellow-500">
									&#10031;
								</span>
							</span>
							<span className="text-sm">{`(${product.numReviews}Reviews)`}</span>
						</div>
						<div>
							<p>In Stock: {product.countInStock}</p>
						</div>
						<div>
							<span>Quantity</span>
							<select
								onChange={(e) => setQty(e.target.value)}
								className="px-2  border-2 border-gray-400 rounded-sm ml-1"
							>
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
							<button
								onClick={() => addToCartHandler()}
								className="bg-yellow-600 hover:bg-yellow-500 py-1 px-2 rounded-lg"
							>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductScreen;
