import jwt from "jsonwebtoken";
import { User } from "../model/user-model.js";
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization"); // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Remove "Bearer " prefix if present
    const tokenParts = token.split(" ")[1].trim();
    try {
        const decoded = jwt.verify(tokenParts, process.env.JWT_SECRET);
        const userData = await User.findOne({ email: decoded.email }).select({
            password: 0,
        });

        req.user = userData;
        req.token = tokenParts;
        req.userId = decoded._id;
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Forbidden" });
    }
}
export { authMiddleware };