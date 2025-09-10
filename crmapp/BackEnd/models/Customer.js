// Importing mongoose to work with MongoDB
const mongoose = require('mongoose');

// Defining a schema for the Customer collection
const customerSchema = new mongoose.Schema({
  // Customer name (must be a string and required)
  name: {
    type: String,
    required: true
  },
  // Customer email (must be a string and required)
  email: {
    type: String,
    required: true
  },
  // Customer phone number (must be a string and required)
  phone: {
    type: String,
    required: true
  },
  // Company name of the customer (must be a string and required)
  company: {
    type: String,
    required: true
  },
  // Owner ID refers to the User who created/owns this customer
  ownerId: {
    type: mongoose.Schema.Types.ObjectId, // Stores MongoDB ObjectId
    ref: 'User', // Reference to the User model (relation)
    required: true
  }
}, {
  // Adds createdAt and updatedAt fields automatically
  timestamps: true
});

// Exporting the Customer model to use in other parts of the app
module.exports = mongoose.model('Customer', customerSchema);
