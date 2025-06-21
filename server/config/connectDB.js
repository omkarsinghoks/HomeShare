const mongoose = require('mongoose');
const connectDB= async () => {
  try {
    await mongoose.connect('mongodb+srv://omkar:UYIhowZQG17VUJQP@cluster0.9glpq.mongodb.net/', { 
      useNewUrlParser: true   ,
      useUnifiedTopology: true,
     
    }); 

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
}
module.exports = {connectDB};
