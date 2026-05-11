import { Bot, User, BookOpen, GraduationCap, Building2, Briefcase, Info } from "lucide-react";
 
const CATEGORY_META = {
  courses:    { label: "Courses",    color: "bg-blue-100 text-blue-700",   icon: GraduationCap },
  exams:      { label: "Exams",      color: "bg-amber-100 text-amber-700", icon: BookOpen },
  hostel:     { label: "Hostel",     color: "bg-purple-100 text-purple-700",icon: Building2 },
  placements: { label: "Placements", color: "bg-green-100 text-green-700", icon: Briefcase },
  admissions: { label: "Admissions", color: "bg-rose-100 text-rose-700",   icon: Info },
  general:    { label: "General",    color: "bg-slate-100 text-slate-600",  icon: Info },
};
 
export default function MessageBubble({ msg }) {
  const isBot  = msg.sender === "bot";
  const isUser = msg.sender === "user";
  const meta   = msg.category ? CATEGORY_META[msg.category] : null;
  const CatIcon = meta?.icon;
 
  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-up">
        <div className="flex items-end gap-2">
          <div className="max-w-xs sm:max-w-md lg:max-w-lg">
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed shadow-sm">
              {msg.text}
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mb-0.5">
            <User size={13} className="text-slate-600" />
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="flex items-end gap-2.5 animate-fade-up">
      <div className="w-7 h-7 rounded-full bg-teal-gradient flex items-center justify-center flex-shrink-0 shadow-sm mb-0.5">
        <Bot size={13} className="text-white" />
      </div>
      <div className="max-w-xs sm:max-w-md lg:max-w-lg space-y-1.5">
        {meta && (
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${meta.color}`}>
            <CatIcon size={10} />
            {meta.label}
          </div>
        )}
        <div className="bg-white border border-slate-100 shadow-card px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-slate-800 leading-relaxed">
          {msg.text}
        </div>
        {msg.sourceCount != null && (
          <p className="text-xs text-slate-400 pl-1">{msg.sourceCount} source{msg.sourceCount !== 1 ? "s" : ""} referenced</p>
        )}
      </div>
    </div>
  );
}