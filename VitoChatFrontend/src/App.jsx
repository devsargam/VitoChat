import { useEffect, useState } from "react";
import "./app.css";

const client = new WebSocket("ws://127.0.0.1:8000/ws/sargam");

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  //   useEffect(() => {
  //     console.log(messages);
  //   }, [messages]);
  const handleForm = (text) => {
    setText(text);
    // console.log(message);
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    client.onopen = () => {
      console.log("websocket client connected");
    };

    client.onmessage = (message) => {
      console.log(message.data);

      setMessages([...messages, message.data]);
    };
  }, []);

  const click = () => {
    client.send(text);
  };

  return (
    <div className="container">
      <h1>Chat App</h1>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="message">message:</label>
          <input
            name="message"
            onChange={(e) => handleForm(e.target.value)}
            type="text"
          />
        </div>
        <button onClick={click} className="btn">
          Send A Message
        </button>
      </form>
    </div>
  );
}

export default App;
