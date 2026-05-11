import { Link, useNavigate } from "react-router-dom";
import { Bot, LogOut, BarChart2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); setOpen(false); };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
            <Bot size={16} className="text-white" />
          </div>
          <span className="font-bold text-slate-900 text-sm hidden sm:block">SRM AI Agent</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[["Home","/"],["Chat","/chatbot"],["About","/about"],["Contact","/contact"]].map(([l,to]) => (
            <Link key={to} to={to} className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">{l}</Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                <BarChart2 size={15} /> Dashboard
              </Link>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
                {user?.name?.[0]?.toUpperCase() || "S"}
              </div>
              <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-500 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                <LogOut size={14} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="px-4 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">Login</Link>
              <Link to="/register" className="px-4 py-2 text-sm text-white rounded-xl transition-all" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>Get Started</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-1">
          {[["Home","/"],["Chat","/chatbot"],["About","/about"],["Contact","/contact"]].map(([l,to]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">{l}</Link>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {isLoggedIn
              ? <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg">Logout</button>
              : <>
                  <Link to="/login"    onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm border border-slate-200 rounded-xl text-center hover:bg-slate-50">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white rounded-xl text-center" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>Get Started</Link>
                </>
            }
          </div>
        </div>
      )}
    </header>
  );
}