import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./configs/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import passport from "./utils/passport.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	next();
});
app.use(
	cors({
		origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
		methods: "GET,POST,PATCH DELETE,PUT",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport(app);

app.get("/", (req, res) => {
	res.send("api is runnings");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log("server running in port", PORT));

connectDb();
