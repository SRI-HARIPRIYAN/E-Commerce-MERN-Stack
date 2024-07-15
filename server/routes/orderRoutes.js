import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	addOrderItems,
	getOrderDetails,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderDetails);

export default router;
