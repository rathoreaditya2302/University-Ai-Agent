import { useState } from "react";
import { Bell, Moon, Globe, Shield, Save, Check } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-teal-600" : "bg-slate-200"}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    compactMode: false,
    saveHistory: true,
    twoFactor: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-up">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
          <Icon size={15} className="text-teal-600" />
        </div>
        <h3 className="font-display font-semibold text-slate-900 text-sm">{title}</h3>
      </div>
      <div className="divide-y divide-slate-50">{children}</div>
    </div>
  );

  const Row = ({ label, desc, settingKey }) => (
    <div className="px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
      </div>
      <Toggle enabled={settings[settingKey]} onChange={() => toggle(settingKey)} />
    </div>
  );

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-5 page-enter">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-slate-900 text-2xl">Settings</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage your preferences and account options</p>
          </div>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
            {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save</>}
          </button>
        </div>

        <Section title="Notifications" icon={Bell}>
          <Row label="Email Notifications" desc="Receive updates and summaries by email"  settingKey="emailNotifications" />
          <Row label="Push Notifications"  desc="Browser push notifications for new answers" settingKey="pushNotifications" />
        </Section>

        <Section title="Appearance" icon={Moon}>
          <Row label="Dark Mode"     desc="Switch to dark theme (coming soon)"      settingKey="darkMode" />
          <Row label="Compact Mode"  desc="Reduce spacing for denser information display" settingKey="compactMode" />
        </Section>

        <Section title="Privacy & Data" icon={Shield}>
          <Row label="Save Chat History" desc="Store your conversations for reference" settingKey="saveHistory" />
          <Row label="Two-Factor Auth"   desc="Extra security layer for your account"   settingKey="twoFactor" />
        </Section>

        <Section title="Language" icon={Globe}>
          <div className="px-6 py-4">
            <label className="text-sm font-medium text-slate-800 block mb-2">Interface Language</label>
            <select className="input-field text-sm" defaultValue="en">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </Section>
      </div>
    </AppLayout>
  );
}