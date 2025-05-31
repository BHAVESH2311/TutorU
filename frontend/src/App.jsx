import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserLanding from "./pages/UserLandingPage";
import TeacherLanding from "./pages/TeacherLandingPage";
import AdminLanding from "./pages/AdminLandingPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute roles={["user"]}>
            <UserLanding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute roles={["teacher"]}>
            <TeacherLanding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLanding />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
