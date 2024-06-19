import mongoose from "mongoose";

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log("mongodb connected", conn.connection.host);
	} catch (error) {
		console.log(error.message);
		process.exit(1); //terminate with code 1 ie. failure
	}
};
export default connectDb;
