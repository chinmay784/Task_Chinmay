const jwt = require("jsonwebtoken");


exports.userAuthMiddelwere = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    try {

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in user auth middleware",
        });
    }
}