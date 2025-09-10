// Importing jsonwebtoken library to handle JWT tokens
const jwt = require('jsonwebtoken');
// Importing the User model to fetch user details from the database
const User = require('../models/User');

// Middleware function to authenticate requests
const auth = async (req, res, next) => {
  try {
    // Extract token from the "Authorization" header, removing the "Bearer " prefix
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If token is not provided, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by the ID stored inside the decoded token
    const user = await User.findById(decoded.userId);
    
    // If no user is found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the authenticated user object to the request for further use
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails or any error occurs, return 401 Unauthorized
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Export the auth middleware to use in other files
module.exports = auth;
