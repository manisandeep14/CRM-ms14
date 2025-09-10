// Importing mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Defining a schema for the Lead collection
const leadSchema = new mongoose.Schema({
  // Reference to the Customer who owns this lead
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Stores MongoDB ObjectId
    ref: 'Customer', // Refers to the Customer model (relationship)
    required: true
  },
  // Title of the lead (short name or identifier)
  title: {
    type: String,
    required: true
  },
  // Detailed description of the lead
  description: {
    type: String,
    required: true
  },
  // Status of the lead - must be one of the given enum values
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Converted', 'Lost'], // Allowed values only
    default: 'New' // Default status is "New"
  },
  // Potential value (e.g., revenue or deal amount) of the lead
  value: {
    type: Number,
    default: 0 // Default value is 0
  }
}, {
  // Adds createdAt and updatedAt timestamps automatically
  timestamps: true
});

// Exporting the Lead model to use in other parts of the application
module.exports = mongoose.model('Lead', leadSchema);
