// Importing jwt for token verification
import jwt from "jsonwebtoken";

// Importing the User model
import User from "../models/user.model.js";

// Middleware function to protect routes
const protectRoute = async (req, res, next) => {
  try {
    // Extracting JWT token from request cookies
    const token = req.cookies.jwt;

    // Logging the retrieved token for debugging
    console.log("Token retrieved:", token);

    // Checking if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token provided (Unauthorized)" });
    }

    // Verifying the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Logging the decoded token for debugging
    console.log("Decoded token:", decoded);

    // Checking if token is valid
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    // Fetching user details based on the decoded token
    const user = await User.findById(decoded.userId).select("-password");

    // Checking if user exists
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Adding the user object to the request for further processing (for authentication)
    req.user = user;

    // If token is valid and user is found, move to the next middleware/route handler
    next();
  } catch (e) {
    // Logging the error for debugging
    console.error(`Error in token verification: ${e.message}`);

    // Handling specific error types
    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid Token" });
    } else if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Handling any other errors that occur during token verification
    res.status(500).json({ error: "Internal server error" });
  }
};

// Exporting the protectRoute middleware function
export default protectRoute;
