import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.userId });
    const cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({
      message: "Added To Cart",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
    });
  }
};

const removeCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.userId });
    const cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({
      message: "Qunatity Descreses",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.userId });
    const cartData = await userData.cartData;
    res.json({
      message: "Cart",
      success: true,
      cartData,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    // Validate input
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({
        message: "Invalid input data",
        success: false,
      });
    }

    // Find the user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if item exists in the cart
    const cartData = userData.cartData;
    if (!cartData[itemId]) {
      return res.status(404).json({
        message: "Item not found in cart",
        success: false,
      });
    }

    // Remove the item from the cart
    delete cartData[itemId];

    // Save the updated user document
    await userData.save();

    // Respond with success
    res.json({
      message: "Removed item successfully",
      success: true,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "An error occurred while removing the item",
      success: false,
      error: error.message,
    });
  }
};

export { addToCart, removeCart, getCart, removeItem };
