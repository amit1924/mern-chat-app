import mongoose from "mongoose"; // Importing mongoose for schema definition

// Defining the message schema
const messageSchema = new mongoose.Schema(
  {
    // Sender's ID, references the User model
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // Receiver's ID, references the User model
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // Message content
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Creating the Message model using the defined schema
const Message = mongoose.model("Message", messageSchema);

// Exporting the Message model
export default Message;
