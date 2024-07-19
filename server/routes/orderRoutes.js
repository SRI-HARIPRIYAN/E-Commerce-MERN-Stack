import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
	addOrderItems,
	getOrderDetails,
	getOrders,
	getUserOrders,
	updateOrderToDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderDetails);
router.route("/deliver/:id").patch(protect, admin, updateOrderToDelivered);

export default router;
