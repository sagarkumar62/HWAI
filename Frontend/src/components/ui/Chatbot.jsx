import React, { useState, useRef, useEffect } from "react";

const BOT_WELCOME = "Hi! I'm HWAI Assistant. How can I help you today?";

function getBotResponse(userMessage) {
  // Simulate bot logic and edge cases
  if (!userMessage.trim()) return "Please enter a message.";
  if (userMessage.length > 500) return "Your message is too long. Please keep it under 500 characters.";
  if (/error|fail|crash/i.test(userMessage)) return "Oops! Something went wrong. Please try again.";
  // Add more edge case responses as needed
  return "I'm just a demo bot. For real support, contact our team!";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: BOT_WELCOME }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Please enter a message." }]);
      setInput("");
      return;
    }
    if (input.length > 500) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Your message is too long. Please keep it under 500 characters." }]);
      setInput("");
      return;
    }
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
      setLoading(false);
    }, 800);
    setInput("");
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chatbot"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white text-black rounded-lg shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white rounded-t-lg">
            <span>HWAI Chatbot</span>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot">✖️</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === "user" ? "text-right" : "text-left"}>
                <span className={msg.from === "user" ? "inline-block bg-blue-100 text-blue-800 rounded px-2 py-1" : "inline-block bg-gray-200 text-gray-800 rounded px-2 py-1"}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-left text-gray-400">Bot is typing...</div>}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex border-t border-gray-200">
            <input
              className="flex-1 px-3 py-2 rounded-bl-lg focus:outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              maxLength={500}
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-br-lg disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
