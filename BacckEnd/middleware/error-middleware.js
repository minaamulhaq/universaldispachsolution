const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const extraDetails = err.extraDetails || "No extra details provided";
    res.status(status).json({
        message,
        extraDetails,
    });
}
export { errorMiddleware };