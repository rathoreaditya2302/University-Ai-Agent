import { useState } from "react";
import { User, Mail, BookOpen, Edit3, Check, X, Camera } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";

const ACTIVITY = [
  { question: "What is the hostel fee?",          category: "hostel",     time: "2 hours ago" },
  { question: "B.Tech CSE total fee?",             category: "courses",    time: "1 day ago" },
  { question: "Midsem exam schedule 2024-25",      category: "exams",      time: "2 days ago" },
  { question: "Top placement companies last year", category: "placements", time: "4 days ago" },
];

const CAT_COLORS = {
  hostel:     "bg-purple-100 text-purple-700",
  courses:    "bg-blue-100 text-blue-700",
  exams:      "bg-amber-100 text-amber-700",
  placements: "bg-green-100 text-green-700",
};

export default function Profile() {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved]     = useState(false);

  const handleSave = () => {
    login({ ...user, ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">

        {/* Page header */}
        <div>
          <h1 className="font-bold text-slate-900 text-2xl">My Profile</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: avatar card ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-6 text-center border border-slate-100">
              <div className="relative inline-block mb-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto"
                  style={{ background: "linear-gradient(135deg,#0d9488,#0f766e)" }}
                >
                  {(user?.name || "S")[0].toUpperCase()}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-600 shadow-sm transition-colors">
                  <Camera size={12} />
                </button>
              </div>

              <h2 className="font-bold text-slate-900 text-lg">{user?.name || "Student"}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{user?.email || "—"}</p>

              {user?.program && (
                <span className="inline-block mt-2 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
                  {user.program}
                </span>
              )}

              {/* Mini stats */}
              <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-bold text-slate-900 text-lg">24</p>
                  <p className="text-xs text-slate-400">Queries</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">7</p>
                  <p className="text-xs text-slate-400">Days Active</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">5★</p>
                  <p className="text-xs text-slate-400">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: details + activity ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Account details card */}
            <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900">Account Details</h3>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 text-sm bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Check size={13} /> Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}
              </div>

              {/* Success banner */}
              {saved && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Check size={14} /> Profile updated successfully!
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200">
                    <User size={15} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Full Name</p>
                    {editing ? (
                      <input
                        value={draft.name}
                        onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                        className="w-full bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3 py-2 text-sm outline-none transition-all"
                        placeholder="Your name"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{user?.name || "—"}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200">
                    <Mail size={15} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Email Address</p>
                    {editing ? (
                      <input
                        type="email"
                        value={draft.email}
                        onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                        className="w-full bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3 py-2 text-sm outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{user?.email || "—"}</p>
                    )}
                  </div>
                </div>

                {/* Program (read-only) */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200">
                    <BookOpen size={15} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Program</p>
                    <p className="text-sm font-medium text-slate-900">{user?.program || "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent activity card */}
            <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800 truncate">{a.question}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                    </div>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${CAT_COLORS[a.category]}`}>
                      {a.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}