import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function CollaborativeTextEditor() {
  const [room, setRoom] = useState("");
  const [text, setText] = useState("");
  const [isTextDisabled, setTextDisabled] = useState(true);

  // Use useRef to persist the socket instance
  const socket = useRef(null);

  useEffect(() => {
    // Initialize socket only once
    if (socket.current === null) {
      socket.current = io("http://localhost:3000/", {
        transports: ["websocket"],
      });
    }

    // Function to handle text change events
    const handleTextChange = (content) => {
      console.log("receive update", content);
      setText(content);
    };

    // Subscribe to socket events
    socket.current.on("text change", handleTextChange);

    // Clean up on component unmount or when room changes
    return () => {
      if (socket.current) {
        socket.current.off("text change", handleTextChange);
      }
    };
  }, []);

  const handleJoinRoom = () => {
    if (socket.current) {
      socket.current.emit("join room", room);
      setTextDisabled(false);
    }
  };

  const handleTextChange = (event) => {
    const content = event.target.value;
    console.log("content", content);
    if (socket.current) {
      socket.current.emit("text change", { room, content });
    }
    setText(content);
  };

  return (
    <div>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room name"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing..."
        disabled={isTextDisabled}
      />
    </div>
  );
}

export default CollaborativeTextEditor;
