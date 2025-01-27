import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    const image_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const payload = {
      ...req.body,
      image: image_filename,
    };

    const food = new foodModel(payload);
    const foodData = await food.save();

    res.json({
      success: true,
      message: "Food Added",
      data: foodData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({
      success: true,
      message: "All Listing",
      data: foods,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

export { addFood, listFood, removeFood };
