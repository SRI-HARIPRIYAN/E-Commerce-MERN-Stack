import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
	const pageNumber = +req.query.pageNumber || 1;
	const pageSize = process.env.PAGINATION_LIMIT;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (pageNumber - 1));
	res.json({ products, pageNumber, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Resource not found");
	}
});

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "sample brand",
		category: "sample category",
		countInStock: 0,
		numReviews: 0,
		description: "sameple description",
	});
	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, image, brand, category, countInStock, description } =
		req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.description = description;

		const updatedProduct = await product.save();
		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found!");
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(204).json({ message: "Product deleted" });
	} else {
		res.status(404);
		throw new Error("Product not found!");
	}
});

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user._id.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product Already reviewed");
		}
		const review = {
			name: req.user.name,
			rating: +rating,
			comment,
			user: req.user._id,
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
};
