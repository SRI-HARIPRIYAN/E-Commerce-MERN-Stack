import React from "react";
import { useGetProductsQuery } from "../../slices/productsApislice";
import Spinner from "../../components/Spinner";

const ProductListScreen = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();
	if (isLoading) return <Spinner />;
	if (error) {
		toast.error(error?.data?.message || error?.error);
		console.log(error.message);
	}
	return (
		<div className="w-full h-full p-4 ">
			<div className="flex justify-between">
				<h2 className="text-lg font-bold">Product List </h2>
				<button className="bg-blue-500 px-1 py-1 text-white rounded-md">
					Create
				</button>
			</div>
			<table className=" w-4/5 mx-auto mt-4 ">
				<thead className="bg-gray-300">
					<tr>
						<th className="border-2">ID</th>
						<th className="border-2">NAME</th>
						<th className="border-2">PRICE</th>
						<th className="border-2">BRAND</th>
						<th className="border-2">ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product._id}>
							<td className="border-2 py-1 px-3 text-center">
								{product._id}
							</td>
							<td className="border-2 py-1  px-3 text-center whitespace-nowrap">
								{product.name}
							</td>
							<td className="border-2 py-1 px-3 text-center">
								${product.price}
							</td>
							<td className="border-2 py-1 px-3 text-center">
								{product.brand}
							</td>
							<td className="border-2 py-1 px-3 text-center flex justify-around gap-3">
								<button className="text-blue-400">Edit</button>
								<button className="text-red-400">Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductListScreen;
