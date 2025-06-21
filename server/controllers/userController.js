const User = require('../models/userModel'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');


async function hashPassword(password) {
  const bcrypt = require('bcrypt'); 
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function registerHandler(req,res) {
  try {
    
    const { name, email, password ,role} = req.body;
    console.log(req.body)
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
      }

    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    } else {  
       const pass=await hashPassword(password);
      const newUser = new User({ name, email, password:pass, role });
      console.log(role)
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully',user:newUser });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' , error: error.message });
  }
  
}


async function loginHandler(req, res  ) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {  
      return res.status(401).json({ message: 'Invalid email or password' });
    }   
    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(password, user.password);  
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_SECRET, { expiresIn: '4h' }); // Replace 'your_jwt_secret' with your actual secret key
    
    res.status(200).json({ message: 'Login successful', token, user });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
    
  }
  
}

async function getUserHandler(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


async function forgetPasswordHandler(req, res) {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error in password set', error: error.message });
  }
}


async function resetPasswordHandler(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Email, old password, and new password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error in password reset', error: error.message });
  }
} 
module.exports = {  
  registerHandler,
  loginHandler,
  getUserHandler,
  forgetPasswordHandler,
  resetPasswordHandler,
  
}