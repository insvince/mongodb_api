// Library Management System - Backend
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import env from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
// Routes
import authRoute from './routes/author.js';
import bookRoute from './routes/book.js';
import userRoute from './routes/user.js';
import genresRoute from './routes/genres.js';
import loginRoute from './routes/login.js';

const app = express();
env.config();
const port = process.env.PORT || 3001;

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // tối đa 100 request mỗi IP trong windowMs
    message: { error: 'Too many requests, please try again later.' },
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true, origin: '*', credentials: true }));

/* MONGODB CONNECT */
mongoose
    .connect(`${process.env.MONGODB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected Database!'))
    .catch((err) => {
        console.log(err);
    });

/* ROUTES */
app.use('/api/authors', authRoute);
app.use('/api/books', bookRoute);
app.use('/api/users', userRoute);
app.use('/api/genres', genresRoute);
app.use('/api/login', loginRoute);

app.listen(port, () => {
    console.log('Server is running in port:' + port);
});
