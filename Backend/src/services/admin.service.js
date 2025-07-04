
import adminModel from "../models/admin.model.js";

export async function createAdmin({ username, email, password, role = "admin" }) {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }
  const admin = new adminModel({ username, email, password, role });
  return await admin.save();
}
