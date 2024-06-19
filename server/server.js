import express from "express";
import dotenv from "dotenv";
import { products } from "./Data/products.js";
import cors from "cors";

import connectDb from "./configs/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.get("/", (req, res) => {
	res.send("api is runnings");
});

app.get("/api/products", (req, res) => {
	res.json(products);
});

app.get("/api/products/:id", (req, res) => {
	const product = products.find((p) => p.id == req.params.id);
	res.json(product);
});

app.listen(PORT, () => console.log("server running in port", PORT));

connectDb();
