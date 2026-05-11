export default function QuickAction({ text, onClick, disabled }) {
  return (
    <button
      onClick={() => onClick(text)}
      disabled={disabled}
      className="flex-shrink-0 px-3.5 py-2 bg-white hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-sm active:scale-95"
    >
      {text}
    </button>
  );
}
 