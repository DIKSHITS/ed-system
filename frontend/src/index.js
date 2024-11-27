/*!
=========================================================
* Paper Dashboard React - v1.3.2
=========================================================
* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim
* Licensed under MIT
=========================================================
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from './views/Login';
import Registration from './views/Registration';
import ForgotPassword from './views/ForgotPassword';

const root = ReactDOM.createRoot(document.getElementById("root"));

// Error Boundary to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);