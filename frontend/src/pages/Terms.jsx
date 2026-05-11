import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Terms() {
  const sections = [
    { title: "Acceptance of Terms",   body: "By using SRM AI Agent, you agree to these terms. If you disagree, please discontinue use immediately." },
    { title: "Use of the Service",    body: "This AI assistant is provided for educational and informational purposes for SRM University students and prospective students." },
    { title: "Accuracy of Information", body: "While we strive for accuracy, answers are AI-generated and may not always be current. Always verify critical information through official SRM channels." },
    { title: "Account Responsibility", body: "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account." },
    { title: "Prohibited Use",        body: "You may not use this service to spread misinformation, harass others, or for any unlawful purpose." },
    { title: "Changes to Terms",      body: "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-hero-gradient py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold text-white text-4xl mb-3">Terms & Conditions</h1>
          <p className="text-slate-300 text-sm">Last updated: January 2025</p>
        </div>
      </section>
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {sections.map(({ title, body }, i) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <h2 className="font-display font-semibold text-slate-900 mb-1.5">{title}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}