import { Link } from "react-router-dom";
import { Bot, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
              <Bot size={14} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">SRM AI Agent</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            AI-powered campus assistant for SRM University students, available 24/7.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm mb-3">Quick Links</p>
          <div className="space-y-2">
            {[["Home","/"],["Chatbot","/chatbot"],["Dashboard","/dashboard"],["About","/about"],["Contact","/contact"]].map(([l,to]) => (
              <Link key={to} to={to} className="block text-sm text-slate-500 hover:text-teal-600 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm mb-3">Legal</p>
          <div className="space-y-2">
            <Link to="/privacy" className="block text-sm text-slate-500 hover:text-teal-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="block text-sm text-slate-500 hover:text-teal-600 transition-colors">Terms of Service</Link>
          </div>
          <div className="mt-6 text-xs text-slate-400">Helpline: 1800-102-1525<br />Mon–Sat, 9AM–5PM</div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} SRM Institute of Science and Technology.</p>
        <p className="text-xs text-slate-400 flex items-center gap-1">Made with <Heart size={11} className="text-red-400" /> for SRM students</p>
      </div>
    </footer>
  );
}