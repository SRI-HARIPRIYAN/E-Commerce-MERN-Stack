import React from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useGetProductsQuery,
} from "../../slices/productsApislice";
import Spinner from "../../components/Spinner";
import Paginate from "../../components/Paginate";
import { useSelector } from "react-redux";

const ProductListScreen = () => {
	const { pageNumber } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber,
	});
	const [createProduct, { isLoading: createLoading }] =
		useCreateProductMutation();
	const [deleteProduct, { isLoading: deleteLoading }] =
		useDeleteProductMutation();

	const { userInfo } = useSelector((state) => state.user);

	if (isLoading) return <Spinner />;
	if (error) {
		toast.error(error?.data?.message || error?.error);
	}
	const handleEditHandler = (id) => {
		navigate(`/admin/products/${id}/edit`);
	};
	const handleDeleteHandler = async (id) => {
		if (window.confirm("Are u sure you want to delete?")) {
			try {
				const res = await deleteProduct(id);
				refetch();
				toast.success(res.message);
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};
	const handleCreateHandler = async () => {
		if (window.confirm("Are u sure?")) {
			try {
				await createProduct();
				refetch();
				toast.success("Product created");
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};
	return (
		<div className=" h-full p-4 ">
			<div className="flex justify-between">
				<h2 className="text-lg font-bold">Product List </h2>
				<button
					onClick={() => handleCreateHandler()}
					className="bg-blue-500 px-1 py-1 text-white rounded-md"
				>
					Create
				</button>
			</div>
			<table className="w-full mx-auto mt-4  ">
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
					{data?.products?.map((product) => (
						<tr key={product._id}>
							<td className="border-2 py-1 px-3 text-center whitespace-nowrap">
								{product._id}
							</td>
							<td className="border-2  py-1 px-3 text-center whitespace-wrap">
								{product.name}
							</td>
							<td className="border-2 py-1 px-3 text-center whitespace-nowrap">
								${product.price}
							</td>
							<td className="border-2 py-1 px-3 text-center whitespace-nowrap">
								{product.brand}
							</td>
							<td className="border-2 py-1 px-3 text-center flex justify-around items-center gap-3">
								<button
									onClick={() =>
										handleEditHandler(product._id)
									}
									className="text-blue-400"
								>
									Edit
								</button>
								<button
									onClick={() =>
										handleDeleteHandler(product._id)
									}
									className="text-red-400"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-center mt-12">
				<Paginate
					pages={data?.pages}
					page={data?.pageNumber}
					isAdmin={userInfo.isAdmin}
				/>
			</div>
			{deleteLoading && <Spinner />}
			{createLoading && <Spinner />}
		</div>
	);
};

export default ProductListScreen;
