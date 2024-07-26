import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import {
	useCreateReviewMutation,
	useGetProductDetailsQuery,
} from "../slices/productsApislice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
const ProductScreen = () => {
	const { id: productId } = useParams();
	const { userInfo } = useSelector((state) => state.user);
	const {
		data: product,
		isLoading,
		error,
		refetch,
	} = useGetProductDetailsQuery(productId);
	const [createReview, { isLoading: createReviewLoading }] =
		useCreateReviewMutation();

	const [userComment, setUserComment] = useState("");
	const [userRating, setUserRating] = useState(5);
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (createReviewLoading) {
		return <Spinner />;
	}

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate("/cart");
	};
	const handleCreateReview = async (e) => {
		e.preventDefault();
		if (userComment === "") {
			return alert("Comment cannot be empty");
		}
		try {
			const res = await createReview({
				productId,
				rating: userRating,
				comment: userComment,
			}).unwrap();
			toast.success(res.message);
			setUserComment("");
			refetch();
		} catch (error) {
			setUserComment("");
			toast.error(error?.data?.message || error?.error);
		}
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
								className="bg-yellow-600 text-white hover:bg-yellow-500 py-1 px-2 rounded-lg"
							>
								Add to cart
							</button>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-2">
								<h3 className=" font-bold">Customer reviews</h3>
								<ul className="flex flex-col gap-2">
									{product?.reviews?.map((review, i) => (
										<div className=" border-2 p-1" key={i}>
											<div>
												{[
													...Array(
														review.rating
													).keys(),
												].map((num) => (
													<span
														key={num}
														className=" text-yellow-500 mr-1"
													>
														&#9733;
													</span>
												))}
											</div>
											<p className="text-sm opacity-80">
												{review.comment}
											</p>
											<p className="font-semibold ">
												{review.name}
											</p>
										</div>
									))}
								</ul>
							</div>
							<h3 className=" font-bold">Write a review</h3>
							<p className="text-sm">Your review: </p>
							<textarea
								className="text-sm w-4/5  max-w-full p-1 border-2"
								name="review"
								id="review"
								placeholder="Write your review here.."
								value={userComment}
								onChange={(e) => setUserComment(e.target.value)}
							></textarea>
							<label className=" font-normal" htmlFor="rating">
								Rating:
								<select
									className=" border-2 px-2"
									name="rating"
									id="rating"
									value={userRating}
									onChange={(e) =>
										setUserRating(e.target.value)
									}
								>
									{[1, 2, 3, 4, 5].map((r) => (
										<option key={r} value={r}>
											{r} stars
										</option>
									))}
								</select>
							</label>
							<button
								onClick={handleCreateReview}
								className=" text-white bg-blue-500 px-1 py-1 w-fit"
							>
								Submit review
							</button>
						</div>

						{!userInfo && (
							<div className="  italic text-sm">
								Please{" "}
								<Link
									className="inline text-blue-400 hover:text-blue-600"
									to="/login"
								>
									login
								</Link>{" "}
								to give review
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductScreen;
