// Importing User model from user.model.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import generateTokenAndSetCookie from "../utils/generateToken.js"; // Importing token generation utility

// Signup function to handle user registration
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    console.log(req.body);
    // Checking if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Checking if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generating profile picture URL based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Creating a new user instance
    const newUser = await new User({
      fullName: fullName,
      username: username,
      password: hashedPassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Saving the user in the database
    await newUser.save();

    // Generating JWT token and setting it in a cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Sending response with user details
    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (e) {
    // Handling errors
    console.log(`Error in Signup: ${e.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login function to handle user authentication
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Finding user by username
    const user = await User.findOne({ username });

    // Checking if user exists and password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generating JWT token and setting it in a cookie
    generateTokenAndSetCookie(user._id, res);

    // Sending response with user details
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (e) {
    // Handling errors
    console.log(`Error in Login: ${e.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout function to handle user logout
export const logout = (req, res) => {
  try {
    // Clearing JWT cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Sending logout success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    // Handling errors
    console.log(`Error in Logout: ${e.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
