import dotenv from "dotenv";
import adminModel from "../models/admin.model.js";
import { createAdmin } from "../services/admin.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

// Register admin
export async function registerAdmin(req, res) {
  try {
    const { username, email, password } = req.body;


    // Restrict: Only one admin allowed
    const adminCount = await adminModel.countDocuments({ role: "admin" });
    if (adminCount > 0) {
      return res.status(403).json({ message: "Only one admin allowed. Registration denied." });
    }

    // Parallelize email existence check and password hash
    const [existingAdmin, hashedPassword] = await Promise.all([
      adminModel.findOne({ email }),
      bcrypt.hash(password, 8)
    ]);

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email." });
    }

    // Create new admin using service
    const user = await createAdmin({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    // Generate JWT token (sync, fast)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

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


    // Restrict: Only one admin can login (if more than one admin exists, block login)
    const adminCount = await adminModel.countDocuments({ role: "admin" });
    if (adminCount > 1) {
      return res.status(403).json({ message: "Multiple admins found. Only one admin allowed. Contact support." });
    }

    const admin = await adminModel.findOne({ email, role: "admin" }).select("+password");
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare password (bcrypt.compare is already fast for short passwords)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token (sync, fast)
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

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
    // console.log("Login error:", error);
  }
}
