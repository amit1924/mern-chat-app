// Importing the Conversation model
import Conversation from "../models/coversation.model.js"; // Fix typo in filename

// Importing the Message model
import Message from "../models/message.model.js"; // Import Message model

// Controller function to send a message
export const sendMessage = async (req, res) => {
  try {
    // Extracting message and receiverId from request body and params
    const { message } = req.body;
    const { id: receiverId } = req.params;

    // Extracting senderId from the authenticated user
    const senderId = req.user._id;

    // Finding an existing conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If conversation does not exist, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Creating a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add the message to the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Saving both conversation and message
    // Using Promise.all to run both save operations in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // Respond with the newly created message
    res.status(201).json({ newMessage: newMessage });
  } catch (err) {
    // Error handling
    console.log(`Error sending message ${err.message}`);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // Extracting userToChatId from request params
    const { id: userToChatId } = req.params;

    // Extracting senderId from the authenticated user
    const senderId = req.user._id;

    // Finding the conversation between sender and userToChatId
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    // Sending the messages as a JSON response
    res.status(200).json({ messages: conversation.messages });
  } catch (err) {
    // Error handling
    console.log(`Error retrieving messages: ${err.message}`);
    res.status(500).json({ message: "Internal Server error" });
  }
};
