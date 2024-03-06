import mongoose from "mongoose"; // Importing mongoose for schema definition

// Defining the user schema
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    fullName: {
      type: String,
      required: true,
    },
    // Username of the user, must be unique
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of the user, must be at least 6 characters long
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Gender of the user, must be either "male" or "female"
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    // Profile picture URL of the user, defaults to an empty string
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Creating the User model using the defined schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
export default User;
