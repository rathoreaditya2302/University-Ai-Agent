import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Eye, EyeOff, UserPlus, AlertCircle, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PROGRAMS = [
  "B.Tech - CSE", "B.Tech - CSE (AI & ML)", "B.Tech - CSE (AI & DS)",
  "B.Tech - ECE", "B.Tech - EEE", "B.Tech - Mechanical",
  "B.Tech - Civil", "B.Tech - IT",
  "M.Tech - CSE", "M.Tech - ECE",
  "MBA", "MCA", "Other",
];

const rules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter",  test: (p) => /[A-Z]/.test(p) },
  { label: "One number",            test: (p) => /\d/.test(p) },
];

export default function Register() {
  const { register } = useAuth();
  const navigate      = useNavigate();

  const [form, setForm]       = useState({ name: "", email: "", password: "", program: "" });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pwStrong = rules.every((r) => r.test(form.password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!pwStrong) {
      setError("Password doesn't meet all requirements.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate("/chatbot", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl items-center justify-center shadow-lg mb-4"
            style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
            <Bot size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Join SRM AI Agent — it's free</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow border border-slate-100 p-8">

          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="Riya Sharma"
                autoComplete="name"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@srmist.edu.in"
                autoComplete="email"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>

            {/* Program */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Program <span className="text-slate-400 font-normal">(optional)</span></label>
              <select
                value={form.program}
                onChange={set("program")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all bg-white text-slate-800"
              >
                <option value="">Select your program</option>
                {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength rules */}
              {form.password.length > 0 && (
                <div className="mt-2.5 space-y-1">
                  {rules.map((r) => {
                    const ok = r.test(form.password);
                    return (
                      <div key={r.label} className={`flex items-center gap-1.5 text-xs ${ok ? "text-teal-600" : "text-slate-400"}`}>
                        <Check size={11} className={ok ? "opacity-100" : "opacity-30"} />
                        {r.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><UserPlus size={15} /> Create Account</>
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}