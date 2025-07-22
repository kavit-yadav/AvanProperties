import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST"],
  },
});

// REST API route
app.get("/api/hello", (req, res) => {
  res.send("Hello from Express!");
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
