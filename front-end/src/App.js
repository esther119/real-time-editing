import "./App.css";
import CollaborativeTextEditor from "./collabComponent";
import { useEffect } from "react";
const EndPoint = "https://cryptic-waters-95799-0fe8a04304b3.herokuapp.com/";
// "https://cryptic-waters-95799-0fe8a04304b3.herokuapp.com/"

function App() {
  // test api

  useEffect(() => {
    fetch(EndPoint)
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
