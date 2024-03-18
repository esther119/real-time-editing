const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Attach socket.io to our server

app.get("/", (req, res) => {
  console.log("__dirname", __dirname); // send index.html file to the browser
  res.sendFile(__dirname + "/index.html");
});

// Handle connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Receive updates from client and broadcast them
  socket.on("text change", (data) => {
    socket.broadcast.emit("text change", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
