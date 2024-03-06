// Importing the Express module
import express from "express";

// Importing the sendMessage function from the message.controller.js file
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

// Creating a router instance
const router = express.Router();

// Defining a route for sending a message
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// Exporting the router
export default router;
