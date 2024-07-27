import path from "path";
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageroute.js";
import userRoutes from "./routes/userroute.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

dotenv.config();

app.use(
  cors({
    origin: "https://chat-app-india.onrender.com", // Update this
    credentials: true,
  })
);

//parse request from client in json format
app.use(express.json());
app.use(cookieParser());

//route middleware
app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server listening on ${PORT}`);
});
