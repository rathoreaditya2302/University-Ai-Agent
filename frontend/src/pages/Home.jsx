import { Link } from "react-router-dom";
import {
  Bot,
  Sparkles,
  GraduationCap,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* SRM Logo */}
          <img
            src="/logo.png.webp"
            alt="SRM Logo"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              SRM AI Agent
            </h1>
            <p className="text-sm text-slate-500">
              Smart Campus Assistant
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
          >
            Login
          </Link>

          
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>

          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-6">
            <Sparkles size={18} />
            AI Powered Campus Assistant
          </div>

          <h1 className="text-6xl font-bold text-slate-900 leading-tight">
            Your Smart
            <span className="text-teal-500"> University </span>
            Companion
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            Get instant help for admissions, exams, fee structure,
            timetable, hostel, placements and academic queries —
            all in one place.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">

            <Link
              to="/chatbot"
              className="px-7 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl flex items-center gap-2 shadow-lg"
            >
              Open Chat <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="px-7 py-4 bg-white border border-slate-300 hover:bg-slate-50 rounded-2xl"
            >
              Login
            </Link>

          

          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8">

            <div>
              <h2 className="text-3xl font-bold text-slate-900">24/7</h2>
              <p className="text-slate-500 text-sm">Availability</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">98%</h2>
              <p className="text-slate-500 text-sm">Accuracy</p>
            </div>

          </div>

        </div>

        {/* Right Card */}
        <div className="relative">

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-900 text-white p-3 rounded-2xl">
                <GraduationCap size={24} />
              </div>

              <div>
                <h3 className="font-bold text-lg">AI Support Panel</h3>
                <p className="text-slate-500 text-sm">
                  Fast responses for students
                </p>
              </div>
            </div>

            <div className="space-y-4">

              <div className="bg-slate-100 p-4 rounded-2xl">
                📌 Admission deadlines?
              </div>

              <div className="bg-teal-500 text-white p-4 rounded-2xl">
                Last date is 30 June. Apply now through portal.
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl">
                📌 Hostel fee details?
              </div>

              <div className="bg-teal-500 text-white p-4 rounded-2xl">
                ₹95,000 yearly including mess & WiFi.
              </div>

            </div>
          </div>

          <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-teal-300 rounded-full blur-3xl opacity-30"></div>
        </div>

      </section>
    </div>
  );
}


