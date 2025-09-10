// Import dependencies
const express = require('express'); // Express framework for building APIs
const mongoose = require('mongoose'); // MongoDB ODM (Object Data Modeling)
const cors = require('cors'); // Middleware to allow cross-origin requests
const dotenv = require('dotenv'); // To load environment variables from .env file

// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize express app

// -------------------- MIDDLEWARE -------------------- //
// Enable CORS (so frontend React app can communicate with backend)
app.use(cors());

// Parse incoming JSON requests (so req.body works properly)
app.use(express.json());

// -------------------- ROUTES -------------------- //
// Authentication routes (login, register, etc.)
app.use('/api/auth', require('./routes/auth'));

// Customer routes (CRUD for customers)
app.use('/api/customers', require('./routes/customers'));

// Lead routes (CRUD for leads associated with customers)
app.use('/api/leads', require('./routes/leads'));

// -------------------- DATABASE CONNECTION -------------------- //
// Connect to MongoDB (using URI from .env or fallback to local DB)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // Success
.catch(err => console.log(err)); // Error

// -------------------- BASIC TEST ROUTE -------------------- //
// Root route just to check API is running
app.get('/', (req, res) => {
  res.json({ message: 'CRM API is running' });
});

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 5000; // Default port = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
