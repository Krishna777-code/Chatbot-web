import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // 👈 Import Bootstrap Icons

const API_URI = import.meta.env.VITE_API_URI;


function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
     const res = await axios.post(API_URI, { text: input });


      if (res.status === 200) {
        setMessages([
          ...messages,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="text-white d-flex flex-column min-vh-100 bg-dark">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark border-bottom border-secondary fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            <i className="bi bi-robot me-2 text-success"></i>BotSpoof
          </h5>
          <FaUserCircle size={30} className="text-white" />
        </div>
      </nav>

      {/* Chat area */}
      <main className="pt-5 pb-5 mt-5 overflow-auto flex-grow-1 d-flex justify-content-center align-items-start">
        <div className="container gap-3 mt-3 d-flex flex-column">
          {messages.length === 0 ? (
            <div className="mt-5 text-center text-secondary fs-5">
              👋 Hi, I'm <span className="fw-semibold text-success">BotSpoof</span>.
              <br />
              <small>Ask me anything below 👇</small>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-3 mw-75 ${
                    msg.sender === "user"
                      ? "bg-primary text-white align-self-end"
                      : "bg-secondary text-light align-self-start"
                  }`}
                  style={{ maxWidth: "75%", wordWrap: "break-word" }}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="gap-2 p-2 bg-secondary text-light rounded-3 align-self-start d-flex align-items-center">
                  <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                  <span>Bot is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 border-top border-secondary bg-dark fixed-bottom">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="text-white border-0 form-control bg-secondary"
              placeholder="Ask BotSpoof..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="btn btn-success d-flex align-items-center justify-content-center"
              onClick={handleSendMessage}
              disabled={loading}
            >
              <i className="bi bi-send-fill me-1"></i> Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
