import express from "express";
import cors from "cors";
import { config } from "dotenv";
import db from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";

// Load environment variables
import dotenv from "dotenv";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // Frontend origin
    credentials: true, // Allow cookies or credentials
  })
);

// Database Connection
db();

// APIs
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`App is Listening on Port : ${port}`);
});
