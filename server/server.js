import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./configs/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.get("/", (req, res) => {
	res.send("api is runnings");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log("server running in port", PORT));

connectDb();
