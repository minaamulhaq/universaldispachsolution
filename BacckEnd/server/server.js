import express from 'express';
import cors from 'cors';

import { router } from '../router/auth-router.js';
import connectDB from '../utils/db.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { router as contactRouter } from '../router/contact-router.js';
import { router as servicesRouter } from '../router/services-router.js';
import { router as adminRouter } from '../router/admin-dashbord.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/auth", contactRouter);
app.use("/api/auth", servicesRouter);
app.use("/admin", adminRouter);




app.use(errorMiddleware);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        // console.log(`Press Ctrl+C to stop the server`);
    });

})