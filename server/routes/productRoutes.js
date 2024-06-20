import express from "express";
import Product from "../models/productModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		res.json({
			message: "Something went wrong",
		});
		console.log(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (error) {
		res.json({
			message: "Product not found",
		});
		console.log(error);
	}
});

export default router;
