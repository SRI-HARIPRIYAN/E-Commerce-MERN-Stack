import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
	useUploadFileHandlerMutation,
} from "../../slices/productsApislice";
import Spinner from "../../components/Spinner.jsx";

const ProductEditScreen = () => {
	const { id: productId } = useParams();
	const {
		data: product,
		isLoading: productLoading,
		error,
	} = useGetProductDetailsQuery(productId);
	const [updateProduct, { isLoading: updateLoading }, refetch] =
		useUpdateProductMutation();
	const [uploadProductImage, { isLoading: uploadLoading }] =
		useUploadFileHandlerMutation();

	const navigate = useNavigate();
	const [productData, setProductData] = useState({
		name: product?.name,
		price: product?.price,
		image: product?.image,
		brand: product?.brand,
		category: product?.category,
		countInStock: product?.countInStock,
		description: product?.description,
	});

	const { name, price, image, brand, category, countInStock, description } =
		productData;
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductData({
			...productData,
			[name]: value,
		});
	};
	const handleUpdateProduct = async (e) => {
		e.preventDefault();

		try {
			await updateProduct({
				productId,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			}).unwrap();
			toast.success("Product updated");
			navigate("/admin/products");
			refetch();
		} catch (err) {
			toast.error(err?.data?.message || err?.error);
		}
	};
	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setProductData({
				...productData,
				image: res.image,
			});
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};
	return (
		<div className="w-full flex justify-center items-center">
			<form
				onSubmit={handleUpdateProduct}
				className=" w-[280px] sm:w-[400px] flex flex-col gap-2"
			>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={name}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="price">Price</label>
					<input
						type="text"
						id="price"
						name="price"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={price}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="image">Image</label>
					<input
						type="file"
						id="image"
						name="image"
						accept="image/*"
						onChange={uploadFileHandler}
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
					/>
				</div>

				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="brand">Brand</label>
					<input
						type="text"
						id="brand"
						name="brand"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={brand}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="category">Category</label>
					<input
						type="text"
						id="category"
						name="category"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={category}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="countInStock">Count In Stock</label>
					<input
						type="text"
						id="countInStock"
						name="countInStock"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1  border-opacity-75"
						value={countInStock}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col p-1 gap-1">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						id="description"
						name="description"
						className=" border-2 border-gray-500 rounded-md p-1 pl-1 border-opacity-75"
						value={description}
						onChange={handleChange}
					/>
				</div>
				<div className=" bg-blue-500 w-fit px-1 py-1 text-white rounded-md">
					<button type="submit" onClick={handleUpdateProduct}>
						Update Product
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductEditScreen;
