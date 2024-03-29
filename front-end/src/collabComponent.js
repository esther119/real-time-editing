import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
const EndPoint = "https://cryptic-waters-95799-0fe8a04304b3.herokuapp.com/";
// "https://cryptic-waters-95799-0fe8a04304b3.herokuapp.com/"
function CollaborativeTextEditor() {
  const [room, setRoom] = useState("");
  const [text, setText] = useState("");
  const [isTextDisabled, setTextDisabled] = useState(true);

  // Use useRef to persist the socket instance
  const socket = useRef(null);

  useEffect(() => {
    // Initialize socket only once
    if (socket.current === null) {
      socket.current = io(EndPoint, {
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
    <div className="p-4">
      {" "}
      {/* Add padding to the container */}
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room name"
        className="border border-gray-300 text-black rounded-md p-2 mb-4" // Add Tailwind classes for styling
      />
      <button
        onClick={handleJoinRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Join Room
      </button>{" "}
      {/* Add Tailwind classes for styling */}
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing..."
        disabled={isTextDisabled}
        className="border border-gray-300 text-black rounded-md p-2 w-full h-40" // Add Tailwind classes for styling
      />
    </div>
  );
}

export default CollaborativeTextEditor;

// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// const EndPoint = "http://localhost:3000/";
// // "https://cryptic-waters-95799-0fe8a04304b3.herokuapp.com/"
// function CollaborativeTextEditor() {
//   const [room, setRoom] = useState("");
//   const [text, setText] = useState("");
//   const [isTextDisabled, setTextDisabled] = useState(true);
//   const socket = useRef(null);

//   useEffect(() => {
//     if (socket.current === null) {
//       socket.current = io(EndPoint, {
//         transports: ["websocket"],
//       });
//     }

//     const handleTextChange = (content) => {
//       console.log("receive update", content);
//       setText(content);
//     };

//     socket.current.on("text change", handleTextChange);

//     return () => {
//       if (socket.current) {
//         socket.current.off("text change", handleTextChange);
//       }
//     };
//   }, []);

//   const handleJoinRoom = () => {
//     if (socket.current) {
//       console.log("join room", room);
//       socket.current.emit("join room", room);
//       setTextDisabled(false);
//     }
//   };

//   return (
//     <div className="flex flex-col p-5 space-y-2 bg-gray-100">
//       <input
//         type="text"
//         className="px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={room}
//         onChange={(e) => setRoom(e.target.value)}
//         placeholder="Room name"
//       />
//       <button
//         className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//         onClick={handleJoinRoom}
//         disabled={!room}
//       >
//         Join Room
//       </button>
//       <textarea
//         className="h-40 px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Start typing..."
//         disabled={isTextDisabled}
//       />
//     </div>
//   );
// }

// export default CollaborativeTextEditor;

// correct code
// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// // import "./CollaborativeTextEditor.css"; // Importing CSS

// function CollaborativeTextEditor() {
//   const [room, setRoom] = useState("");
//   const [text, setText] = useState("");
//   const [isTextDisabled, setTextDisabled] = useState(true);

//   // Use useRef to persist the socket instance
//   const socket = useRef(null);

//   useEffect(() => {
//     // Initialize socket only once
//     if (socket.current === null) {
//       socket.current = io("http://localhost:3000/", {
//         transports: ["websocket"],
//       });
//     }

//     // Function to handle text change events
//     const handleTextChange = (content) => {
//       console.log("receive update", content);
//       setText(content);
//     };

//     // Subscribe to socket events
//     socket.current.on("text change", handleTextChange);

//     // Clean up on component unmount or when room changes
//     return () => {
//       if (socket.current) {
//         socket.current.off("text change", handleTextChange);
//       }
//     };
//   }, []);

//   const handleJoinRoom = () => {
//     if (socket.current) {
//       socket.current.emit("join room", room);
//       setTextDisabled(false);
//     }
//   };

//   const handleTextChange = (event) => {
//     const content = event.target.value;
//     console.log("content", content);
//     if (socket.current) {
//       socket.current.emit("text change", { room, content });
//     }
//     setText(content);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={room}
//         onChange={(e) => setRoom(e.target.value)}
//         placeholder="Room name"
//       />
//       <button onClick={handleJoinRoom}>Join Room</button>
//       <textarea
//         value={text}
//         onChange={handleTextChange}
//         placeholder="Start typing..."
//         disabled={isTextDisabled}
//       />
//     </div>
//   );
// }

// export default CollaborativeTextEditor;
