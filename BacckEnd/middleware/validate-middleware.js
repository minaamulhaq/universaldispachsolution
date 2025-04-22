
const validateMiddleware = (schema) => (req, res, next) => {
    try {
        const result = schema.parse(req.body);
        req.body = result;
        next();
    } catch (error) {
        // return res.status(400).json({ message: error });
        return next({
            status: 400,
            message: error.errors[0].message,
            extraDetails: error,
        });

    }
}
export { validateMiddleware };