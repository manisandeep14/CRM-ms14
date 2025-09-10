// Importing mongoose to work with MongoDB
const mongoose = require('mongoose');

// Defining a schema for the User collection
const userSchema = new mongoose.Schema({
  // Name of the user
  name: {
    type: String,
    required: true
  },
  // Email of the user (must be unique across all users)
  email: {
    type: String,
    required: true,
    unique: true // Ensures no two users have the same email
  },
  // Hashed password (stored securely, not plain text)
  passwordHash: {
    type: String,
    required: true
  },
  // Role of the user - can only be 'Admin' or 'User'
  role: {
    type: String,
    enum: ['Admin', 'User'], // Allowed values only
    default: 'User' // Default role is "User"
  }
}, {
  // Adds createdAt and updatedAt fields automatically
  timestamps: true
});

// Exporting the User model so it can be used in other parts of the app
module.exports = mongoose.model('User', userSchema);
