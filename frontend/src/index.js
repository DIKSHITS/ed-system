import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import Registration from "views/Registration";
import ForgotPassword from "views/ForgotPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Redirect root path to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Layout */}
      <Route path="/admin/*" element={<AdminLayout />} />
      {/* Redirect admin base path */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Catch-all route */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  </BrowserRouter>
); 