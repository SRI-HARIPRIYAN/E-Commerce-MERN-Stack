import React from "react";
import { Link } from "react-router-dom";
export default function Product({ product }) {
	return (
		<Link
			to={`/products/${product.id}`}
			className="flex flex-col justify-around p-1 shadow-md shadow-gray-400"
		>
			<div>
				<img
					src={product.image}
					alt={product.name}
					height="200px"
					width="200px"
					className=" mx-auto"
				/>
			</div>
			<div>
				<p className=" font-bold">{product.name}</p>
			</div>
			<div>
				<span>{product.rating}</span>
				<span>{`(${product.numReviews} Reviews)`}</span>
			</div>
			<div>
				<span>${product.price.toFixed(2)}</span>
			</div>
		</Link>
	);
}
