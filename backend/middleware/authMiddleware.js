const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            let token;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            } else if (req.query && req.query.token) {
                token = req.query.token;
            }

            if (!token) {
                return res.status(401).json({ message: "No token provided, authorization denied" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Unauthorized role access" });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token is not valid" });
        }
    };
};

module.exports = authMiddleware;
