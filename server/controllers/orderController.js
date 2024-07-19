import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;
	if (orderItems?.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		const order = new Order({
			orderItems: orderItems.map((item) => ({
				...item,
				product: item._id,
			})),
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		const createOrder = await order.save();
		res.status(201).json(createOrder);
	}
});

const getOrderDetails = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (order) {
		res.status(200).json(order);
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});

const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id }).populate(
		"user",
		"name email"
	);
	res.status(200).json(orders);
});
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find().populate("user", "id name");
	res.send(orders);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updateOrder = await order.save();
		res.status(200).json(updateOrder);
		console.log(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

export {
	addOrderItems,
	getOrderDetails,
	getUserOrders,
	getOrders,
	updateOrderToDelivered,
};
