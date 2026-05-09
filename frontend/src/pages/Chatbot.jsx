import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";

const QUICK_REPLIES = [
  "What is the hostel fee?",
  "What is the B.Tech CSE fee?",
  "When do mid semester exams start?",
  "What companies come for placements?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I am your SRM University AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { question: text });
      const botMsg = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow overflow-hidden">

        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Sparkles className="text-teal-400" />
            <span className="font-bold">SRM AI Assistant</span>
          </div>
          <span className="text-sm text-slate-400">Available 24/7</span>
        </div>

        {/* Messages */}
        <div className="h-[520px] overflow-y-auto p-6 space-y-5 bg-slate-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl px-5 py-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-slate-900 text-white"
                    : "bg-white shadow text-slate-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white shadow px-5 py-4 rounded-2xl flex items-center gap-2 text-slate-500 text-sm">
                <Loader2 size={16} className="animate-spin" />
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-6 py-4 border-t flex gap-3 flex-wrap">
          {QUICK_REPLIES.map((item) => (
            <button
              key={item}
              onClick={() => sendMessage(item)}
              disabled={loading}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-5 border-t flex gap-3">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 border rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="bg-teal-500 hover:bg-teal-600 text-white px-5 rounded-2xl disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}