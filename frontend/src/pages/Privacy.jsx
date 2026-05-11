// Privacy.jsx
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export function Privacy() {
  const sections = [
    { title: "Information We Collect",    body: "We collect your name, email, program details, and chat queries to personalise your experience and improve our service." },
    { title: "How We Use Your Data",       body: "Your data is used solely to provide and improve the SRM AI Assistant. We do not sell or share personal data with third parties." },
    { title: "Data Storage",              body: "Chat history and account data are stored securely on our servers. You can delete your data at any time through account settings." },
    { title: "Cookies",                   body: "We use only essential cookies required for authentication and session management. No third-party tracking cookies are used." },
    { title: "Contact for Privacy Issues", body: "If you have concerns about your data, email us at info@srmist.edu.in or call the helpline at 1800-102-1525." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-hero-gradient py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold text-white text-4xl mb-3">Privacy Policy</h1>
          <p className="text-slate-300 text-sm">Last updated: January 2025</p>
        </div>
      </section>
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map(({ title, body }) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card">
              <h2 className="font-display font-semibold text-slate-900 mb-2">{title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Privacy;