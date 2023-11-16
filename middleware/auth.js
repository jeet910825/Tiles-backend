const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const verifyToken = (req, res, next) => {
    const token = req.headers.token
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
  
      // If the token is valid, add the user information to the request
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    // Continue to the next middleware
    next();
  };

  const isAdmin = (req,res,next) =>{
    if(!req.user.isAdmin){
      return res.status(201)
    }
    next();
  }

  module.exports = {verifyToken , isAdmin}