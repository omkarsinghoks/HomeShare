const express=require('express');
const userRouter=require('./route/userRouter');
const homeListingHandler=require('./route/homeListingRouter');
const {authenticate}=require('./middleware/authenticate');
const bookingRouter=require('./route/bookingRouter');
const {connectDB}=require('./config/connectDB');
const cors = require('cors');

const app=express();
app.use(cors({
  origin: ['https://home-share.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies or auth headers
}));
app.use(express.json())
app.use('/uploads', express.static('uploads'));


connectDB();

require('dotenv').config();
// connectDB();
app.use('/api/users', userRouter);
app.use(authenticate);
app.use('/api/home-listing', homeListingHandler);  
app.use('/api/bookings', bookingRouter); // Assuming you have a bookingRouter set up

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
});



// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('DB connection error:', err));

// const PORT = process.env.PORT || 8000;
