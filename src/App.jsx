import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m your SoftGoWay Assistant. Ask me anything!" }
  ]);
  const chatBodyRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://localhost:8080/api/faq?question=" + encodeURIComponent(input));
      const data = await response.json();
      setMessages([
        ...newMessages,
        { sender: "bot", text: data.answer }
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "❌ Error fetching response" }
      ]);
    }

    setInput("");
  };

  useEffect(() => {
    // Scroll to bottom on new message
    chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="chat-bg">
      <div className="chat-wrapper">
        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <img alt="ShoftGoWay" src="https://img.icons8.com/fluency/48/robot-2.png" className="logo" />
            <span>SoftGoWay FAQ Chatbot</span>
          </div>

          {/* Chat body */}
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  "message-row " + (msg.sender === "user" ? "right" : "left")
                }
              >
                {msg.sender === "bot" && (
                  <img
                    alt="bot"
                    className="avatar"
                    src="https://img.icons8.com/fluency/36/robot-2.png"
                  />
                )}
                <div className={`message-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <img
                    alt="you"
                    className="avatar"
                    src="https://img.icons8.com/color/36/user-male-circle--v2.png"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              placeholder="Ask your question..."
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <svg width="24" height="24" fill="none">
                <path
                  d="M3 20l18-8L3 4v7l12 1-12 1v7z"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <footer className="chat-powered">
        Powered by SoftGoWay &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}