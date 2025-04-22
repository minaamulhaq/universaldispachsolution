
const adminMiddleware = (req, res, next) => {
    const data = req.user;
    // console.log("Admin Middleware", data);
    const admin = data.isAdmin;
    // console.log("Admin Middleware", admin);
    try {
        if (!admin) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
export { adminMiddleware };