const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Attach socket.io to our server

app.use(cors());
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

// Handle connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Joining a room
  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Handle text changes in a specific room
  socket.on("text change", (data) => {
    const { room, content } = data;
    // Broadcast to all other users in the room
    socket.to(room).emit("text change", content);
  });

  // Leaving a room
  socket.on("leave room", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
