import mongoose from "mongoose"; // Importing mongoose for schema definition

// Defining the conversation schema
const conversationSchema = new mongoose.Schema(
  {
    // Array of participant IDs, referencing the User model
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Array of message IDs, referencing the Message model
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Creating the Conversation model using the defined schema
const Conversation = mongoose.model("Conversation", conversationSchema);

// Exporting the Conversation model
export default Conversation;
