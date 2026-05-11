import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const CONTACTS = [
  {
    icon: Phone,
    title: "Helpline",
    lines: ["1800-102-1525", "Mon – Sat · 9 AM – 5 PM"],
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@srmist.edu.in", "admissions@srmist.edu.in"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Address",
    lines: ["SRM Nagar, Kattankulathur", "603203, Kanchipuram Dist., TN"],
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Clock,
    title: "Library Hours",
    lines: ["Mon–Sat: 8 AM – 10 PM", "Sunday: 9 AM – 6 PM"],
    color: "bg-amber-50 text-amber-600",
  },
];

const FAQS = [
  { q: "How do I apply for admission?",         a: "Apply online at srmist.edu.in → Appear for SRMJEEE → Attend counselling → Pay fee → Confirm seat." },
  { q: "What is the last date for admission?",  a: "Applications close on 30 June every year. Apply early to avoid last-minute issues." },
  { q: "What documents are needed?",            a: "10th & 12th marksheets, Transfer Certificate, Aadhaar card, Passport photos, Migration Certificate." },
  { q: "How to apply for bus pass?",            a: "Apply through the student portal at the start of each semester. Routes cover major city locations." },
  { q: "What is the minimum attendance?",        a: "75% attendance is compulsory to be eligible for end-semester examinations." },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold text-white text-4xl mb-3">Contact & Support</h1>
          <p className="text-slate-300 leading-relaxed">
            Can't find what you need? Reach out directly or use the AI assistant for instant answers.
          </p>
          <Link to="/chatbot" className="inline-flex items-center gap-2 mt-6 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all">
            <MessageCircle size={17} /> Ask AI Assistant
          </Link>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACTS.map(({ icon: Icon, title, lines, color }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-card hover:shadow-hover transition-all">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3 bg-opacity-20`}>
                <Icon size={18} />
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-sm mb-2">{title}</h3>
              {lines.map((l, i) => (
                <p key={i} className="text-sm text-slate-500 leading-relaxed">{l}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-slate-900 text-2xl mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
                <p className="font-semibold text-slate-900 text-sm mb-2">{q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}