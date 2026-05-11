import { Link } from "react-router-dom";
import { Home, Bot, ArrowLeft } from "lucide-react";
import Navbar from "../components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 bg-slate-50">
        <div className="text-center max-w-md animate-fade-up">
          <div className="relative inline-block mb-8">
            <p className="font-display font-bold text-8xl text-slate-100 select-none">404</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-teal-gradient rounded-3xl flex items-center justify-center shadow-glow">
                <Bot size={28} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="font-display font-bold text-slate-900 text-2xl mb-3">Page not found</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            The page you're looking for doesn't exist. Maybe the AI assistant can help instead?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2 py-3 px-5">
              <ArrowLeft size={15} /> Go Home
            </Link>
            <Link to="/chatbot" className="btn-primary flex items-center justify-center gap-2 py-3 px-5">
              <Bot size={15} /> Open Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}