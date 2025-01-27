import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
dotenv.config();

const Authenticated = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        message: "Login First",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
    });
  }
};

export default Authenticated;
