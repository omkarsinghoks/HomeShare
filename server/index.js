require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./route/userRouter');
const homeListingRouter = require('./route/homeListingRouter');
const bookingRouter = require('./route/bookingRouter');
const { authenticate } = require('./middleware/authenticate');
const { connectDB } = require('./config/connectDB');

app.use(express.json()); // must come before routes

const allowedOrigins = [
  'http://localhost:3000',
  'https://home-share-delta.vercel.app',
  'https://home-share-git-main-omkarsinghoks-projects.vercel.app',
  'https://home-share-k5iow2wnq-omkarsinghoks-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/uploads', express.static('uploads'));

connectDB();

app.get('/api/ping', (req, res) => {
  res.json({ message: 'CORS working' });
});

app.use('/api/users', userRouter);
app.use('/api/home-listing', authenticate, homeListingRouter);
app.use('/api/bookings', authenticate, bookingRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
