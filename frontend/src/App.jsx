import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home           from "./pages/Home";
import Chatbot        from "./pages/Chatbot";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import Dashboard      from "./pages/Dashboard";
import Profile        from "./pages/Profile";
import Settings       from "./pages/Settings";
import About          from "./pages/About";
import Contact        from "./pages/Contact";
import Admin          from "./pages/Admin";
import Analytics      from "./pages/Analytics";
import HelpCenter     from "./pages/HelpCenter";
import ForgotPassword from "./pages/ForgotPassword";
import Privacy        from "./pages/Privacy";
import Terms          from "./pages/Terms";
import NotFound       from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/chatbot"         element={<Chatbot />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/dashboard"       element={<Dashboard />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/settings"        element={<Settings />} />
        <Route path="/about"           element={<About />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="/admin"           element={<Admin />} />
        <Route path="/analytics"       element={<Analytics />} />
        <Route path="/help"            element={<HelpCenter />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/privacy"         element={<Privacy />} />
        <Route path="/terms"           element={<Terms />} />
        <Route path="*"                element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;