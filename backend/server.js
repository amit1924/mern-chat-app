import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageroute.js";
import userRoutes from "./routes/userroute.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5000", // specify the frontend URL
    credentials: true, // allow credentials to be sent
  })
);

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
