import express from "express";
import Authenticated from "../middlewares/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", Authenticated, placeOrder);
orderRouter.get("/userorders", Authenticated, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
