export function isAdminOrUser(req, res, next) {
  // Fast path: check user and role in one go
  const role = req.user?.role;
  if (role === 'admin' || role === 'user') {
    return next();
  }
  res.status(403).json({ message: "Access denied. Requires Admin or User role." });
}
