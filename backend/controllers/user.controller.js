import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // Extracting the ID of the currently logged-in user
    const loggedInUserId = req.user._id;

    // Finding all users except the currently logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ filteredUsers: filteredUsers });
  } catch (err) {
    // Error handling
    console.log(`Error getting users: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};
