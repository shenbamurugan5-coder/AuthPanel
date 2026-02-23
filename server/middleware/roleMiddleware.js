const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "superuser") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Superuser only." });
    }
};

module.exports = { isAdmin };
