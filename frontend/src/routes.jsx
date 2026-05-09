import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function RoutesConfig() {
return ( <Routes>
<Route path="/" element={<Home />} />
<Route path="/chatbot" element={<Chatbot />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<Profile />} />
<Route path="*" element={<NotFound />} /> </Routes>
);
}

export default RoutesConfig;
