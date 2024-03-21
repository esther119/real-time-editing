import "./App.css";
import CollaborativeTextEditor from "./collabComponent";
import { useEffect } from "react";
function App() {
  // test api

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <CollaborativeTextEditor></CollaborativeTextEditor>
      </header>
    </div>
  );
}

export default App;
