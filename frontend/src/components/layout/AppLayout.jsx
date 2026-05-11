import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative">
            <Sidebar onClose={() => setMobileOpen(false)} />
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white z-10" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="lg:pl-64 min-h-screen flex flex-col">
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <Menu size={20} className="text-slate-600" />
          </button>
          <span className="font-bold text-slate-900 text-sm">SRM AI Agent</span>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}