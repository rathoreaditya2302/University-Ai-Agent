import { NavLink, useNavigate } from "react-router-dom";
import { Bot, BarChart2, User, Settings, LogOut, GraduationCap, HelpCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/chatbot",   icon: Bot,          label: "AI Assistant" },
  { to: "/dashboard", icon: BarChart2,     label: "Analytics" },
  { to: "/profile",   icon: User,          label: "Profile" },
  { to: "/settings",  icon: Settings,      label: "Settings" },
];

const SECONDARY = [
  { to: "/about",   icon: GraduationCap, label: "About" },
  { to: "/contact", icon: HelpCircle,    label: "Help & Contact" },
];

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 flex flex-col z-40 shadow-2xl" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">SRM AI Agent</p>
            <p className="text-slate-400 text-xs">Smart Campus Assistant</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Main</p>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive ? "text-white bg-teal-600/80" : "text-slate-400 hover:text-white hover:bg-white/10"}`
            }>
            <Icon size={17} />{label}
          </NavLink>
        ))}

        <div className="pt-4">
          <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Support</p>
          {SECONDARY.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive ? "text-white bg-teal-600/80" : "text-slate-400 hover:text-white hover:bg-white/10"}`
              }>
              <Icon size={17} />{label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User */}
      {user && (
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
              {user.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name || "Student"}</p>
              <p className="text-slate-400 text-xs truncate">{user.email || ""}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors p-1">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}