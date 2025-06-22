import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/config/db.config.js";
import authRoutes from "./src/routes/auth.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Hello World!");
})

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server Running on http://localhost:"+ PORT)
})