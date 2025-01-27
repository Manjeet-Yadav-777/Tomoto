import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  const { userId, items, amount, address, status, payment } = req.body;

  // Debug incoming data

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No items in the order" });
  }

  try {
    const orderData = new orderModel({
      userId,
      items,
      amount,
      address,
      status: status,
      payment: payment,
    });

    const savedOrder = await orderData.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

const userOrders = async (req, res) => {
  try {
    const userOrders = await orderModel.find({ userId: req.body.userId });

    res.json({
      success: true,
      data: userOrders,
    });
  } catch (error) {}
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({
      message: "Status Updated",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
    });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
