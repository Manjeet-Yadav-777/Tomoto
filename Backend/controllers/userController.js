import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Adding token expiration for better security
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Account not found!",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    // Generate token
    const token = await createToken(user._id);
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`,
      data: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input fields
    if (!name || !email || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(200).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Password must be at least 8 characters long!",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate token
    const token = await createToken(savedUser._id);
    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      data: savedUser,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export { loginUser, registerUser };
