import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // should contain { id, role, ... }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token.", error: error.message });
    }
}
