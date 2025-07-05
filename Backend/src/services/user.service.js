import User from "../models/user.model.js";

// Service: create a new user
export async function createUser({ username, email, password }) {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }
  const user = new User({ username, email, password });
  return await user.save();
}
