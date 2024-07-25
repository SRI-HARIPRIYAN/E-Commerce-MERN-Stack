import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
	createProduct,
	createProductReview,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct); //router.get("/", getProducts);
router.route("/:id/review").post(protect, createProductReview);

router
	.route("/:id")
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct); //router.get("/:id", getProductById);

export default router;
