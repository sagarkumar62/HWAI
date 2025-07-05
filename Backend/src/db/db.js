import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.mongodbURL;
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;