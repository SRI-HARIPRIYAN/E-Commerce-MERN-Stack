import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./Data/users.js";
import products from "./Data/products.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import connectDb from "./configs/db.js";

dotenv.config();
connectDb();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[2]._id;

		const sampleProducts = products.map((p) => {
			return { ...p, user: adminUser };
		});

		await Product.insertMany(sampleProducts);
		console.log("Data is imported");
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data destryed");
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

console.log(process.argv[2]);

if (process.argv[2] == "-d") {
	destroyData();
} else {
	importData();
}
