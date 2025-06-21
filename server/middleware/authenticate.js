require('dotenv').config();

async function authenticate(req, res, next) {
  const jwt = require('jsonwebtoken');
  
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the Authorization header 
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET); // Replace 'your_jwt_secret' with your actual secret key
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token', error: error.message });
  }
}
module.exports = {authenticate};