
// export default function Dashboard() {
//   return (
//     <div className="p-8 grid md:grid-cols-3 gap-6">
//       <div className="bg-white p-6 rounded-xl shadow-card">
//         <h2>Total Queries</h2>
//         <p className="text-4xl font-bold">1240</p>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-card">
//         <h2>Students</h2>
//         <p className="text-4xl font-bold">320</p>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-card">
//         <h2>CSAT</h2>
//         <p className="text-4xl font-bold">94%</p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import {
  BarChart2, Bot, TrendingUp, Users, MessageSquare, Clock,
  GraduationCap, BookOpen, Home, Briefcase, ChevronRight,
  ArrowUpRight, ArrowDownRight, Star, Zap
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

/* ── Palette ── */
const TEAL  = "#0d9488";
const TEAL2 = "#0f766e";
const PIE_COLORS = ["#0d9488", "#0891b2", "#7c3aed", "#f59e0b", "#ef4444", "#10b981"];

/* ── Mock data ── */
const WEEKLY_QUERIES = [
  { day: "Mon", queries: 12 },
  { day: "Tue", queries: 19 },
  { day: "Wed", queries: 8  },
  { day: "Thu", queries: 25 },
  { day: "Fri", queries: 17 },
  { day: "Sat", queries: 6  },
  { day: "Sun", queries: 4  },
];

const MONTHLY_ACTIVITY = [
  { month: "Jan", queries: 30 },
  { month: "Feb", queries: 45 },
  { month: "Mar", queries: 28 },
  { month: "Apr", queries: 60 },
  { month: "May", queries: 52 },
  { month: "Jun", queries: 75 },
  { month: "Jul", queries: 48 },
  { month: "Aug", queries: 90 },
  { month: "Sep", queries: 65 },
  { month: "Oct", queries: 82 },
  { month: "Nov", queries: 70 },
  { month: "Dec", queries: 55 },
];

const CATEGORY_DATA = [
  { name: "Courses",     value: 35, icon: BookOpen,      color: "bg-blue-100 text-blue-700" },
  { name: "Hostel",      value: 22, icon: Home,           color: "bg-purple-100 text-purple-700" },
  { name: "Placements",  value: 18, icon: Briefcase,      color: "bg-green-100 text-green-700" },
  { name: "Exams",       value: 14, icon: GraduationCap,  color: "bg-amber-100 text-amber-700" },
  { name: "Admissions",  value: 7,  icon: Users,          color: "bg-rose-100 text-rose-700" },
  { name: "General",     value: 4,  icon: MessageSquare,  color: "bg-slate-100 text-slate-700" },
];

const RECENT_QUERIES = [
  { q: "What is the hostel fee for girls?",          cat: "hostel",     time: "2 min ago",  status: "answered" },
  { q: "B.Tech CSE fee structure 2024-25",           cat: "courses",    time: "18 min ago", status: "answered" },
  { q: "Midsem exam schedule this semester",         cat: "exams",      time: "1 hr ago",   status: "answered" },
  { q: "Top 10 placement companies last year",       cat: "placements", time: "3 hr ago",   status: "answered" },
  { q: "How to apply for SRMJEEE 2025?",             cat: "admissions", time: "5 hr ago",   status: "answered" },
];

const CAT_BADGE = {
  hostel:     "bg-purple-100 text-purple-700",
  courses:    "bg-blue-100 text-blue-700",
  exams:      "bg-amber-100 text-amber-700",
  placements: "bg-green-100 text-green-700",
  admissions: "bg-rose-100 text-rose-700",
  general:    "bg-slate-100 text-slate-600",
};

/* ── Sub-components ── */
function StatCard({ icon: Icon, label, value, delta, deltaUp, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-teal-100"
          style={{ background: "linear-gradient(135deg,#f0fdfa,#ccfbf1)" }}>
          <Icon size={18} className="text-teal-600" />
        </div>
        {delta && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${deltaUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            {deltaUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="font-bold text-slate-900 text-base">{children}</h2>;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-slate-700">{label}</p>
      <p className="text-teal-600 font-bold mt-0.5">{payload[0].value} queries</p>
    </div>
  );
};


export default function Dashboard() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("weekly");

  const chartData = period === "weekly" ? WEEKLY_QUERIES : MONTHLY_ACTIVITY;
  const xKey      = period === "weekly" ? "day" : "month";

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-bold text-slate-900 text-2xl">
              Welcome back, {user?.name?.split(" ")[0] || "Student"} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Here's your activity overview</p>
          </div>
          <Link to="/chatbot"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm hover:opacity-90 transition-all active:scale-95 self-start sm:self-auto"
            style={{ background: "linear-gradient(135deg,#0d9488,#0f766e)" }}>
            <Bot size={15} /> Ask AI Assistant
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={MessageSquare} label="Total Queries"     value="91"    delta="+12%" deltaUp />
          <StatCard icon={TrendingUp}    label="This Week"          value="24"    delta="+8%"  deltaUp />
          <StatCard icon={Star}          label="Satisfaction"       value="4.8/5" delta="+0.2" deltaUp />
          <StatCard icon={Clock}         label="Avg Response Time"  value="1.2s"  delta="-0.3s" deltaUp />
        </div>

        {/* Chart + Category breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Area chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <SectionTitle>Query Activity</SectionTitle>
              <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
                {["weekly","monthly"].map((p) => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all capitalize ${period === p ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={TEAL} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={TEAL} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="queries" stroke={TEAL} strokeWidth={2.5}
                  fill="url(#tealGrad)" dot={{ fill: TEAL, r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: TEAL2, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie + breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <SectionTitle>By Category</SectionTitle>
            <div className="flex justify-center my-3">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={38} outerRadius={60}
                    dataKey="value" paddingAngle={3}>
                    {CATEGORY_DATA.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {CATEGORY_DATA.map(({ name, value, icon: Icon, color }, i) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
                    <Icon size={10} />{name}
                  </span>
                  <span className="ml-auto text-xs font-semibold text-slate-700">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent queries */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Recent Queries</SectionTitle>
            <Link to="/analytics" className="text-xs text-teal-600 font-medium hover:text-teal-700 flex items-center gap-0.5">
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-2">
            {RECENT_QUERIES.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#f0fdfa,#ccfbf1)" }}>
                  <Bot size={13} className="text-teal-600" />
                </div>
                <p className="flex-1 text-sm text-slate-800 truncate">{item.q}</p>
                <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${CAT_BADGE[item.cat]}`}>{item.cat}</span>
                <span className="flex-shrink-0 text-xs text-slate-400 hidden sm:block">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Ask about Courses",    to: "/chatbot", icon: BookOpen,     color: "bg-blue-50 text-blue-700 border-blue-100" },
            { label: "Hostel Info",           to: "/chatbot", icon: Home,          color: "bg-purple-50 text-purple-700 border-purple-100" },
            { label: "Placement Stats",       to: "/chatbot", icon: Briefcase,    color: "bg-green-50 text-green-700 border-green-100" },
            { label: "Exam Schedule",         to: "/chatbot", icon: GraduationCap, color: "bg-amber-50 text-amber-700 border-amber-100" },
          ].map(({ label, to, icon: Icon, color }) => (
            <Link key={label} to={to}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center hover:shadow-sm transition-all active:scale-95 ${color}`}>
              <Icon size={20} />
              <span className="text-xs font-medium leading-snug">{label}</span>
            </Link>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
