import express from "express";
import {
  addToCart,
  getCart,
  removeCart,
  removeItem,
} from "../controllers/cartController.js";
import Authenticated from "../middlewares/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add", Authenticated, addToCart);
cartRouter.post("/remove", Authenticated, removeCart);
cartRouter.get("/get", Authenticated, getCart);
cartRouter.post("/removeItem", Authenticated, removeItem);

export default cartRouter;
