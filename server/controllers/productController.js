import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	if (products) {
		res.json(products);
	}
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
export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
