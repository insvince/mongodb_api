import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import env from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/author.js';
import bookRoute from './routes/book.js';

const app = express();
env.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors());

/* MONGODB CONNECT */
mongoose
    .connect(`${process.env.MONGODB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('Connected Database!'))
    .catch((err) => {
        console.log(err);
    });

/* ROUTES */
app.use('/api/authors', authRoute);
app.use('/api/books', bookRoute);
app.use('/api/users', bookRoute);

app.listen(port, () => {
    console.log('Server is running in port:' + port);
});
