import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Trash2, Download, ChevronDown, User, Loader2 } from "lucide-react";
import axios from "axios";
import AppLayout from "../components/layout/AppLayout";

const sendMessage = (question) => axios.post("/api/chat", { question }).then((r) => r.data);

const CAT_COLOR = {
  courses:"bg-blue-100 text-blue-700", exams:"bg-amber-100 text-amber-700",
  hostel:"bg-purple-100 text-purple-700", placements:"bg-green-100 text-green-700",
  admissions:"bg-rose-100 text-rose-700", general:"bg-slate-100 text-slate-600",
};

function TypingDots() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{background:"linear-gradient(135deg,#0d9488,#0f766e)"}}>
        <Bot size={13} className="text-white" />
      </div>
      <div className="bg-white border border-slate-100 shadow px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
        {[0,160,320].map((d) => (
          <span key={d} className="w-2 h-2 rounded-full bg-teal-400 inline-block" style={{animation:`bounce 1.4s ease infinite ${d}ms`}} />
        ))}
      </div>
    </div>
  );
}

function Bubble({ msg }) {
  if (msg.sender === "user") {
    return (
      <div className="flex justify-end gap-2 items-end">
        <div className="max-w-xs sm:max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed shadow-sm">{msg.text}</div>
        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mb-0.5"><User size={13} className="text-slate-600" /></div>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 shadow-sm" style={{background:"linear-gradient(135deg,#0d9488,#0f766e)"}}>
        <Bot size={13} className="text-white" />
      </div>
      <div className="max-w-xs sm:max-w-md space-y-1.5">
        {msg.category && <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${CAT_COLOR[msg.category]||CAT_COLOR.general}`}>{msg.category}</span>}
        <div className="bg-white border border-slate-100 shadow px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-slate-800 leading-relaxed">{msg.text}</div>
        {msg.sourceCount != null && <p className="text-xs text-slate-400 pl-1">{msg.sourceCount} source{msg.sourceCount!==1?"s":""} referenced</p>}
      </div>
    </div>
  );
}

function Chip({ text, onClick, disabled }) {
  return (
    <button onClick={()=>onClick(text)} disabled={disabled}
      className="flex-shrink-0 px-3.5 py-2 bg-white hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 transition-all disabled:opacity-40 whitespace-nowrap shadow-sm active:scale-95">
      {text}
    </button>
  );
}

const SUGGESTIONS = [
  "What is the fee for B.Tech CSE?","When do midsem exams start?",
  "Hostel fee & facilities?","Top placement companies 2023-24?","Documents needed for admission?",
];

const WELCOME = { sender:"bot", text:"👋 Hello! I'm your SRM University AI Assistant. Ask me anything about courses, fees, exams, hostel, placements, or admissions!" };

export default function Chatbot() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showDown, setShowDown] = useState(false);
  const bottomRef  = useRef(null);
  const scrollRef  = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowDown(scrollHeight - scrollTop - clientHeight > 120);
  };

  const handleSend = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setMessages((p) => [...p, { sender:"user", text:q }]);
    setInput("");
    if (inputRef.current) { inputRef.current.style.height = "48px"; }
    setLoading(true);
    try {
      const data = await sendMessage(q);
      setMessages((p) => [...p, { sender:"bot", text:data.answer, category:data.category, sourceCount:data.source_count }]);
    } catch {
      setMessages((p) => [...p, { sender:"bot", text:"⚠️ Something went wrong. Please try again." }]);
    } finally { setLoading(false); }
  };

  const handleKey = (e) => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleTA  = (e) => { setInput(e.target.value); e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,120)+"px"; };
  const clearChat = () => setMessages([WELCOME]);
  const exportChat = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([messages.map((m)=>`[${m.sender.toUpperCase()}]: ${m.text}`).join("\n\n")],{type:"text/plain"}));
    a.download = "srm-chat.txt"; a.click();
  };

  return (
    <AppLayout>
      <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0);opacity:.4}40%{transform:scale(1);opacity:1}}`}</style>
      <div className="flex flex-col bg-slate-50" style={{height:"100vh"}}>

        <header className="bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow" style={{background:"linear-gradient(135deg,#0d9488,#0f766e)"}}>
              <Bot size={17} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm">SRM AI Assistant</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500">Online · Powered by Groq LLaMA</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={exportChat} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"><Download size={16} /></button>
            <button onClick={clearChat}  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
          </div>
        </header>

        <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {messages.length === 1 && (
            <div className="max-w-2xl mx-auto mb-2">
              <div className="border border-teal-100 rounded-2xl p-5 text-center" style={{background:"linear-gradient(135deg,#f0fdfa,#ffffff)"}}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow" style={{background:"linear-gradient(135deg,#0d9488,#0f766e)"}}>
                  <Sparkles size={22} className="text-white" />
                </div>
                <h2 className="font-bold text-slate-900 text-base mb-1">Ask SRM AI Anything</h2>
                <p className="text-sm text-slate-500">From fee structures to placement stats — instant, accurate university info.</p>
              </div>
            </div>
          )}
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
            {loading && <TypingDots />}
            <div ref={bottomRef} />
          </div>
        </div>

        {showDown && (
          <button onClick={()=>bottomRef.current?.scrollIntoView({behavior:"smooth"})}
            className="fixed bottom-32 right-6 w-9 h-9 bg-white border border-slate-200 rounded-full shadow flex items-center justify-center text-slate-500 hover:text-teal-600 transition-all z-10">
            <ChevronDown size={16} />
          </button>
        )}

        <div className="bg-white border-t border-slate-100 px-4 py-2.5 flex-shrink-0">
          <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto">
            {SUGGESTIONS.map((s) => <Chip key={s} text={s} onClick={handleSend} disabled={loading} />)}
          </div>
        </div>

        <div className="bg-white border-t border-slate-200 px-4 py-3.5 flex-shrink-0">
          <div className="max-w-3xl mx-auto flex items-end gap-2.5">
            <textarea ref={inputRef} value={input} onChange={handleTA} onKeyDown={handleKey} disabled={loading}
              placeholder="Ask about courses, exams, hostel, placements..." rows={1}
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 resize-none outline-none transition-all disabled:opacity-50"
              style={{minHeight:"48px",maxHeight:"120px"}} />
            <button onClick={()=>handleSend()} disabled={loading||!input.trim()}
              className="w-11 h-11 flex-shrink-0 text-white rounded-2xl flex items-center justify-center shadow transition-all disabled:opacity-40 active:scale-95"
              style={{background:"linear-gradient(135deg,#0d9488,#0f766e)"}}>
              {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">SRM AI may make mistakes. Verify critical info with official sources.</p>
        </div>

      </div>
    </AppLayout>
  );
}