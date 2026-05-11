import { Bot, Brain, Database, Shield, Zap, Users, GraduationCap, Award, Github, Linkedin, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function FeaturePill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
      <Icon size={12} />
      {label}
    </span>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function TechBadge({ name, color }) {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${color}`}>{name}</span>
  );
}

function TeamCard({ initials, name, role, detail }) {
  return (
    <div className="flex flex-col items-center text-center p-5">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-3 shadow"
        style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}
      >
        {initials}
      </div>
      <p className="font-semibold text-slate-900 text-sm">{name}</p>
      <p className="text-xs text-teal-600 font-medium mt-0.5">{role}</p>
      <p className="text-xs text-slate-400 mt-1">{detail}</p>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <p className="font-medium text-slate-900 text-sm flex items-start gap-2">
        <ChevronRight size={15} className="text-teal-500 mt-0.5 flex-shrink-0" />
        {q}
      </p>
      <p className="text-slate-500 text-sm mt-1.5 ml-5 leading-relaxed">{a}</p>
    </div>
  );
}

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Responses",
    desc: "Uses a fine-tuned language model trained exclusively on SRM University data — admissions, hostel, courses, placements, exams, and more.",
  },
  {
    icon: Database,
    title: "Structured Knowledge Base",
    desc: "Answers are drawn from curated CSV datasets that are regularly updated, so you always get accurate, university-specific information.",
  },
  {
    icon: Zap,
    title: "Instant Answers",
    desc: "No waiting in queues or navigating complex portals. Type your question and get a precise answer in seconds, 24 × 7.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your conversations are protected. We never share your personal data or query history with third parties.",
  },
  {
    icon: Users,
    title: "Student-First Design",
    desc: "Built by SRM students for SRM students. The interface is intentionally simple so you can focus on getting answers, not figuring out the tool.",
  },
  {
    icon: GraduationCap,
    title: "Campus-Wide Coverage",
    desc: "Covers all major domains — B.Tech, M.Tech, MBA, MCA programs; hostel life; placement stats; exam schedules; and general campus info.",
  },
];

const TECH_STACK = [
  { name: "React 18",     color: "bg-sky-100 text-sky-700" },
  { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-700" },
  { name: "FastAPI",      color: "bg-green-100 text-green-700" },
  { name: "PostgreSQL",   color: "bg-blue-100 text-blue-700" },
  { name: "SQLAlchemy",   color: "bg-indigo-100 text-indigo-700" },
  { name: "Axios",        color: "bg-purple-100 text-purple-700" },
  { name: "React Router", color: "bg-rose-100 text-rose-700" },
  { name: "Lucide Icons", color: "bg-amber-100 text-amber-700" },
];

const TEAM = [
  { initials: "AR", name: "Aditya Rathore",   role: "Full-Stack Lead",    detail: "B.Tech CSE-DS · 4th Year" },
  { initials: "PR", name: "Pranjal Rai",   role: "AI / NLP Engineer",  detail: "B.Tech CSE-DS · 4th Year" },
  { initials: "GK", name: "Gulshan Kumar",  role: "Backend Developer",  detail: "B.Tech CSE-DS · 4th Year" },
];

const FAQS = [
  {
    q: "Is the SRM AI Agent officially affiliated with SRM University?",
    a: "This is a student-built project and is not an official product of SRM Institute of Science and Technology. All data is sourced from publicly available university resources.",
  },
  {
    q: "How accurate are the answers?",
    a: "Answers are based on structured datasets maintained by our team. While we aim for high accuracy, always verify critical information (like fees or deadlines) from official SRM portals.",
  },
  {
    q: "Does the agent remember my previous conversations?",
    a: "Currently each session is independent. Conversation history within a session is maintained, but history does not persist across logins.",
  },
  {
    q: "What topics can I ask about?",
    a: "Courses and fees, hostel facilities and charges, placement statistics, exam schedules, admission processes, campus transport, attendance rules, and general helpline information.",
  },
  {
    q: "How can I report an incorrect answer?",
    a: "Use the Help & Contact page to submit a correction. We review all feedback and update the knowledge base regularly.",
  },
];

export default function About() {
  const { isLoggedIn } = useAuth();

  const content = (
    <div className="max-w-5xl mx-auto px-5 py-10 space-y-10">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #134e4a 100%)" }}>
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #5eead4, transparent)" }} />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="relative px-8 py-12 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl"
            style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}
          >
            <Bot size={30} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">About SRM AI Agent</h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            A smart, 24 × 7 campus assistant built by SRM students to help you navigate
            university life — from fees and hostels to placements and exam schedules.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <FeaturePill icon={Brain}         label="AI-Powered" />
            <FeaturePill icon={Shield}        label="Secure" />
            <FeaturePill icon={Zap}           label="Instant" />
            <FeaturePill icon={GraduationCap} label="SRM-Specific" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <Card className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-slate-100">
          <Stat value="500+"  label="Students Helped" />
          <Stat value="6"     label="Topic Categories" />
          <Stat value="24/7"  label="Always Available" />
          <Stat value="95%"   label="Accuracy Rate" />
        </div>
      </Card>

      {/* Mission */}
      <Card className="p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 border border-teal-100">
            <Award size={18} className="text-teal-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-xl mb-2">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Navigating a large university can be overwhelming — scattered portals, long
              email threads, and queues just to find a fee structure. SRM AI Agent exists
              to change that. We centralise campus knowledge into a single conversational
              interface so every student — from a nervous fresher to a final-year searching
              for placement data — can get precise answers in seconds.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              We believe access to information shouldn't depend on who you know or how long
              you've been on campus. This tool is for every SRM student, equally.
            </p>
          </div>
        </div>
      </Card>

      {/* Features */}
      <div>
        <h2 className="font-bold text-slate-900 text-xl mb-4">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-5 hover:shadow-md transition-shadow">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border border-teal-100"
                style={{ background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)" }}
              >
                <Icon size={17} className="text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <Card className="p-6">
        <h2 className="font-bold text-slate-900 text-lg mb-4">Built With</h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((t) => (
            <TechBadge key={t.name} {...t} />
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
          The frontend is a React SPA styled with Tailwind CSS, communicating with a
          FastAPI backend that serves answers from a PostgreSQL database and structured
          CSV knowledge files. The AI layer uses a custom category detector and a
          retrieval-based answer engine tuned for SRM-specific queries.
        </p>
      </Card>

      {/* Team */}
      <div>
        <h2 className="font-bold text-slate-900 text-xl mb-4">The Team</h2>
        <Card>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
            {TEAM.map((m) => (
              <TeamCard key={m.name} {...m} />
            ))}
          </div>
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex flex-wrap gap-4 justify-center">
            <a href="https://github.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium">
              <Github size={13} /> GitHub Repository
            </a>
            <a href="mailto:srmaiagenteam@example.com"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors font-medium">
              <Mail size={13} /> srmaiagenteam@example.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">
              <Linkedin size={13} /> LinkedIn
            </a>
          </div>
        </Card>
      </div>

      {/* FAQs */}
      <Card className="p-6">
        <h2 className="font-bold text-slate-900 text-lg mb-2">Frequently Asked Questions</h2>
        {FAQS.map((f) => (
          <FAQ key={f.q} {...f} />
        ))}
      </Card>

      {/* CTA */}
      <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)" }}>
        <h2 className="font-bold text-slate-900 text-xl mb-2">Ready to get answers?</h2>
        <p className="text-slate-600 text-sm mb-5">Ask anything about SRM University — fees, hostel, placements, and more.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/chatbot"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
            Open AI Assistant
          </Link>
          <Link to="/contact"
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );

  if (isLoggedIn) {
    return <AppLayout>{content}</AppLayout>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">{content}</div>
      <Footer />
    </>
  );
}