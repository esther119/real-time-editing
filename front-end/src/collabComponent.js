import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function CollaborativeTextEditor() {
  const [room, setRoom] = useState("");
  const [text, setText] = useState("");
  const [isTextDisabled, setTextDisabled] = useState(true);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io();

    // Receive text updates from the server
    socket.current.on("text change", (content) => {
      console.log("receive update", content);
      setText(content);
    });

    // Clean up on component unmount or when room changes
    return () => {
      if (socket.current) {
        socket.current.off("text change");
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
