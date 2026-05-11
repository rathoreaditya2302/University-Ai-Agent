import { Bot } from "lucide-react";
 
export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-fade-up">
      <div className="w-7 h-7 rounded-full bg-teal-gradient flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot size={13} className="text-white" />
      </div>
      <div className="bg-white border border-slate-100 shadow-card rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-teal-500 dot1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-teal-400 dot2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-teal-300 dot3 inline-block" />
      </div>
    </div>
  );
}
 