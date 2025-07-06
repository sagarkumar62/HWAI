export function isAdminOrUser(req, res, next) {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'user')) {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Requires Admin or User role." });
    }
}
