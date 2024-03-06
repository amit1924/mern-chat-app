import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageroute.js";
import userRoutes from "./routes/userroute.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

//parse request from client in json format
app.use(express.json());
app.use(cookieParser());

//route middleware
app.use("/api/auth", authRoutes);
//http://localhost:3000/api/messages/send/123
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server listening on ${PORT}`);
});
