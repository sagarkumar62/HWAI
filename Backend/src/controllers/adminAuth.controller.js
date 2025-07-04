import adminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register admin
export async function registerAdmin(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const user = await adminModel.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Login admin
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await userModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    // Return admin info (excluding password) and token
    const { password: _, ...adminData } = admin.toObject();
    res.status(200).json({
      message: "Login successful.",
      admin: {
        id: adminData._id,
        username: adminData.username,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}
