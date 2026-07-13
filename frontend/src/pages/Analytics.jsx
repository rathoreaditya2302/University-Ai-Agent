import { useState } from "react";
import {
  BarChart2, MessageSquare, Clock, TrendingUp, Star,
  BookOpen, Home, GraduationCap, Briefcase, HelpCircle,
  Calendar, Activity
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

const WEEKLY_DATA = [
  { day: "Mon", count: 5 },
  { day: "Tue", count: 9 },
  { day: "Wed", count: 6 },
  { day: "Thu", count: 12 },
  { day: "Fri", count: 8 },
  { day: "Sat", count: 3 },
  { day: "Sun", count: 2 },
];

const CATEGORIES = [
  { label: "Hostel",     icon: Home,          count: 18, color: "bg-purple-100 text-purple-700",  bar: "bg-purple-400",  pct: 72 },
  { label: "Courses",    icon: BookOpen,       count: 14, color: "bg-blue-100 text-blue-700",     bar: "bg-blue-400",    pct: 56 },
  { label: "Exams",      icon: GraduationCap,  count: 9,  color: "bg-amber-100 text-amber-700",   bar: "bg-amber-400",   pct: 36 },
  { label: "Placements", icon: Briefcase,      count: 6,  color: "bg-green-100 text-green-700",   bar: "bg-green-400",   pct: 24 },
  { label: "General",    icon: HelpCircle,     count: 3,  color: "bg-slate-100 text-slate-600",   bar: "bg-slate-300",   pct: 12 },
];

const RECENT = [
  { q: "What is the hostel fee for girls?",          cat: "hostel",     catColor: "bg-purple-100 text-purple-700", time: "2h ago",  rating: 5 },
  { q: "B.Tech CSE total fee per semester?",          cat: "courses",    catColor: "bg-blue-100 text-blue-700",    time: "1d ago",  rating: 5 },
  { q: "Midsem exam schedule 2024–25",                cat: "exams",      catColor: "bg-amber-100 text-amber-700",  time: "2d ago",  rating: 4 },
  { q: "Top companies for placements last year",      cat: "placements", catColor: "bg-green-100 text-green-700",  time: "3d ago",  rating: 5 },
  { q: "Library timings on weekends",                 cat: "general",    catColor: "bg-slate-100 text-slate-600",  time: "5d ago",  rating: 4 },
];

const maxBar = Math.max(...WEEKLY_DATA.map((d) => d.count));

export default function Analytics() {
  const [range, setRange] = useState("week");

  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-2xl shadow overflow-hidden border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
          <Icon size={15} className="text-teal-600" />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-slate-900 text-2xl">Analytics</h1>
            <p className="text-slate-500 text-sm mt-0.5">Your usage insights and query history</p>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {["week", "month", "all"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                  range === r
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {r === "all" ? "All time" : `This ${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Queries",   value: "50",    sub: "+12 this week",  icon: MessageSquare, tint: "bg-blue-50",   ico: "text-blue-500"   },
            { label: "Avg. Response",   value: "1.4s",  sub: "Faster than avg", icon: Clock,         tint: "bg-teal-50",  ico: "text-teal-600"   },
            { label: "Satisfaction",    value: "4.8★",  sub: "Based on 24 ratings", icon: Star,      tint: "bg-amber-50", ico: "text-amber-500"  },
            { label: "Active Days",     value: "14",    sub: "Last 30 days",   icon: TrendingUp,    tint: "bg-purple-50",ico: "text-purple-500" },
          ].map(({ label, value, sub, icon: Icon, tint, ico }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow p-4 space-y-3">
              <div className={`w-9 h-9 rounded-xl ${tint} flex items-center justify-center`}>
                <Icon size={16} className={ico} />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xl leading-none">{value}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
                <p className="text-xs text-teal-600 mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Weekly activity bar chart */}
          <Section title="Daily Activity" icon={Activity}>
            <div className="px-6 py-5">
              <div className="flex items-end gap-2 h-28">
                {WEEKLY_DATA.map(({ day, count }) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {count}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-teal-500 hover:bg-teal-600 transition-all cursor-default"
                      style={{ height: `${(count / maxBar) * 80}px` }}
                    />
                    <span className="text-xs text-slate-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Category breakdown */}
          <Section title="Query Categories" icon={BarChart2}>
            <div className="px-6 py-3 space-y-3">
              {CATEGORIES.map(({ label, icon: Icon, count, color, bar, pct }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
                        <Icon size={11} />
                        {label}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{count} queries</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${bar} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-4" />
          </Section>
        </div>

        {/* Recent queries */}
        <Section title="Recent Queries" icon={Calendar}>
          <div className="divide-y divide-slate-50">
            {RECENT.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 truncate">{item.q}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.catColor}`}>
                    {item.cat}
                  </span>
                  <span className="text-xs text-amber-500 font-medium">{"★".repeat(item.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </AppLayout>
  );
}