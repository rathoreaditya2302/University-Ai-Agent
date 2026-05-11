import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const TOPICS = [
  { icon: BookOpen,     title: "Admissions",    desc: "Application process, deadlines, eligibility, documents required.", link: "/chatbot" },
  { icon: BookOpen,     title: "Courses & Fees", desc: "Fee structures, program details, duration, and eligibility criteria.", link: "/chatbot" },
  { icon: MessageCircle,title: "Exams",          desc: "Mid-semester and end-semester schedules, grading, and attendance.", link: "/chatbot" },
  { icon: Phone,        title: "Hostel",         desc: "Room types, facilities, mess timings, and accommodation fees.", link: "/chatbot" },
  { icon: Mail,         title: "Placements",     desc: "Company visits, salary packages, eligibility and preparation.", link: "/chatbot" },
  { icon: Phone,        title: "Transport",      desc: "Bus routes, pass application, and campus transport info.", link: "/chatbot" },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-hero-gradient py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold text-white text-4xl mb-3">Help Center</h1>
          <p className="text-slate-300 leading-relaxed mb-6">Find answers fast using our AI assistant or browse by topic below.</p>
          <Link to="/chatbot" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all">
            <MessageCircle size={17} /> Ask AI Assistant <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-slate-900 text-2xl mb-8 text-center">Browse by Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.map(({ icon: Icon, title, desc, link }) => (
              <Link key={title} to={link}
                className="bg-white rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-200 group card-hover block">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
                  <Icon size={18} className="text-teal-600" />
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                <div className="mt-3 flex items-center gap-1 text-teal-600 text-xs font-medium">
                  Ask the AI <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-slate-900 text-2xl mb-3">Still need help?</h2>
          <p className="text-slate-500 text-sm mb-6">Contact the university directly for queries not covered by the AI assistant.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:18001021525" className="inline-flex items-center gap-2 btn-secondary py-2.5 px-5 text-sm">
              <Phone size={15} /> 1800-102-1525
            </a>
            <a href="mailto:info@srmist.edu.in" className="inline-flex items-center gap-2 btn-primary py-2.5 px-5 text-sm">
              <Mail size={15} /> Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}