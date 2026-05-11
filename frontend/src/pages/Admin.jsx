import { Upload, RefreshCw, Users, Database, FileText, Shield } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

const ADMIN_CARDS = [
  { icon: Upload,     title: "Upload Documents",  desc: "Add new data sources or update existing CSV files for courses, exams, hostel, and placements.", action: "Upload File",   color: "bg-blue-50 text-blue-600" },
  { icon: RefreshCw,  title: "Refresh AI Data",   desc: "Re-seed the database with the latest CSV data and rebuild the AI knowledge base.",              action: "Refresh Now",  color: "bg-teal-50 text-teal-600" },
  { icon: Users,      title: "Manage Users",       desc: "View registered students, manage accounts, and review usage patterns.",                          action: "View Users",   color: "bg-purple-50 text-purple-600" },
  { icon: Database,   title: "Database Status",    desc: "Monitor database health, query performance, and storage usage.",                                  action: "View Status",  color: "bg-amber-50 text-amber-600" },
  { icon: FileText,   title: "Query Logs",         desc: "Review all student queries, AI responses, and identify gaps in knowledge coverage.",              action: "View Logs",    color: "bg-rose-50 text-rose-600" },
  { icon: Shield,     title: "Security",           desc: "Manage API keys, rate limits, and access permissions for the backend services.",                  action: "Manage",       color: "bg-green-50 text-green-600" },
];

export default function Admin() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6 page-enter">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-slate-900 text-2xl">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage data, users, and system configuration</p>
          </div>
          <span className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-semibold rounded-full border border-rose-200 flex items-center gap-1.5">
            <Shield size={11} /> Admin Access
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADMIN_CARDS.map(({ icon: Icon, title, desc, action, color }, i) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-200 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4 bg-opacity-30`}>
                <Icon size={18} />
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-sm mb-1.5">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{desc}</p>
              <button className="w-full py-2 px-4 border border-slate-200 hover:border-teal-400 hover:text-teal-600 rounded-xl text-xs font-medium text-slate-600 transition-all bg-slate-50 hover:bg-teal-50">
                {action}
              </button>
            </div>
          ))}
        </div>

        {/* System status */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-slate-900 mb-4">System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "API",       status: "Operational",  ok: true },
              { label: "Database",  status: "Connected",    ok: true },
              { label: "Groq LLM",  status: "Operational",  ok: true },
              { label: "Frontend",  status: "Running",      ok: true },
            ].map(({ label, status, ok }) => (
              <div key={label} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ok ? "bg-green-500" : "bg-red-500"}`} />
                <div>
                  <p className="text-xs font-medium text-slate-700">{label}</p>
                  <p className={`text-xs ${ok ? "text-green-600" : "text-red-500"}`}>{status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}