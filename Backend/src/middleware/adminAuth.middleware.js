import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// Middleware to check if user is authenticated and has admin role using JWT token from cookies
export function isAdmin(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided in cookies." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    if (decoded.role === "admin") {
      req.user = decoded;
      return next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}