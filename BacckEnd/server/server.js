import express from 'express';
import cors from 'cors';

import { router } from '../router/auth-router.js';
import connectDB from '../utils/db.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { router as contactRouter } from '../router/contact-router.js';
import { router as servicesRouter } from '../router/services-router.js';
import { router as adminRouter } from '../router/admin-dashbord.js';

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
    'http://146.190.147.92:4173',
    'http://146.190.147.92',
    // future production domain
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Replace with your frontend URL

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
        console.log(`Server is running on ${PORT}`);
        // console.log(`Press Ctrl+C to stop the server`);
    });

})