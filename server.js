const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server started on ws://localhost:8080");

let cursorPositions = {};
let documentText = ""; // Stores the current state of the document text

wss.on("connection", (ws) => {
  const userId = generateUniqueUserId();
  console.log(`User connected: ${userId}`);

  // Send the initial state when a new user connects
  ws.send(
    JSON.stringify({
      type: "init",
      userId,
      cursors: cursorPositions,
      text: documentText,
    })
  );

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "cursorMove":
        // Handle cursor movement as before
        console.log("cursor move websocket server");
        cursorPositions[data.userId] = { x: data.x, y: data.y };
        break;

      case "textChange":
        // Update the document text and broadcast the change
        // console.log("text change websocket server");
        documentText = data.text;
        broadcast("textChange", { userId: data.userId, text: data.text }, ws);
        break;
    }
  });

  ws.on("close", () => {
    console.log(`User disconnected: ${userId}`);
    delete cursorPositions[userId];
    broadcast("userDisconnected", { userId }, null);
  });
});

function broadcast(type, data, excludeWs) {
  wss.clients.forEach((client) => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, ...data }));
    }
  });
}

function generateUniqueUserId() {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
}
