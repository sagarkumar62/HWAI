import { Admin } from "mongodb";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
      type:String,
      enum: ['admin']
    }
});

const adminModel = mongoose.model("admin", adminSchema);
export default adminModel;