import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["student", "parent", "admin", "teacher"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
