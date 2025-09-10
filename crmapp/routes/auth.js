// Import required modules
const express = require('express');
const bcrypt = require('bcryptjs'); // For hashing and comparing passwords
const jwt = require('jsonwebtoken'); // For creating and verifying JWT tokens
const User = require('../models/User'); // Import User model

// Initialize Express router
const router = express.Router();

/* ======================
   REGISTER ROUTE
   ====================== */
router.post('/register', async (req, res) => {
  try {
    // Extract fields from request body
    const { name, email, password, role } = req.body;

    // Check if a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password with bcrypt
    const saltRounds = 12; // Higher value = stronger hash but slower
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const user = new User({
      name,
      email,
      passwordHash, // Store hashed password, not plain text
      role: role || 'User' // Default role is "User" if not provided
    });

    // Save user to the database
    await user.save();

    // Generate JWT token for authentication
    const token = jwt.sign(
      { userId: user._id },           // Payload: user ID
      process.env.JWT_SECRET,         // Secret key from environment
      { expiresIn: '24h' }            // Token valid for 24 hours
    );

    // Send response with token and user details (excluding password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
});

/* ======================
   LOGIN ROUTE
   ====================== */
router.post('/login', async (req, res) => {
  try {
    // Extract login details
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a new JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response with token and user details
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router to be used in app.js / server.js
module.exports = router;
