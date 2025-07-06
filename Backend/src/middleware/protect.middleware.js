import jwt from "jsonwebtoken";

// Common protect middleware for all roles
export function protect(roles = []) {
  // roles: array of allowed roles, e.g. ["admin"], ["user"], ["admin", "user"]
  return (req, res, next) => {
    try {
      // Accept token from cookies or Authorization header
      const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided." });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
      req.user = decoded; // should contain { id, role, ... }
      if (roles.length === 0 || roles.includes(decoded.role)) {
        return next();
      } else {
        return res.status(403).json({ message: `Access denied. Requires role: ${roles.join(", ")}` });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token.", error: error.message });
    }
  };
}
