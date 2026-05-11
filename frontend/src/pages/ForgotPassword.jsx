import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, Bot } from "lucide-react";
import Navbar from "../components/layout/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-10 bg-slate-50">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="bg-white rounded-3xl shadow-card p-8 border border-slate-100">

            {!sent ? (
              <>
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Mail size={22} className="text-teal-600" />
                </div>
                <h1 className="font-display font-bold text-slate-900 text-2xl text-center mb-1.5">Reset Password</h1>
                <p className="text-slate-500 text-sm text-center mb-7 leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" required
                    className="input-field"
                  />
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading
                      ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                      : <>Send Reset Link <ArrowRight size={16} /></>
                    }
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <h2 className="font-display font-bold text-slate-900 text-xl mb-2">Check your inbox</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. It may take a few minutes to arrive.
                </p>
                <Link to="/login" className="btn-primary py-3 px-6 inline-block text-sm">
                  Back to Login
                </Link>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}