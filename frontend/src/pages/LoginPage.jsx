import React, { useState } from "react";
// createRoot and ReactDOM.render are removed as per request,
// assuming a parent component will handle rendering.
import { Mail, Lock, LogIn } from "lucide-react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Custom message display function
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, 5000); // Message disappears after 5 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear previous messages

    // Basic validation
    if (!formData.email || !formData.password) {
      showMessage("Please enter both email and password.", "error");
      setLoading(false);
      return;
    }

    // {
    //     "message": "Logged in successfully",
    //     "user": {
    //         "id": "68a1a34320caccdf19aeff9a",
    //         "email": "shubhampandeyhaihum@gmail.com",
    //         "role": "student",
    //         "profileId": "68a1a34320caccdf19aeff9c"
    //     },
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTFhMzQzMjBjYWNjZGYxOWFlZmY5YSIsInJvbGUiOiJzdHVkZW50IiwicHJvZmlsZUlkIjoiNjhhMWEzNDMyMGNhY2NkZjE5YWVmZjljIiwiaWF0IjoxNzU1NDI0MDY1LCJleHAiOjE3NTU0MjQ5NjV9.dTIfiiDbTKFCRLaaFxxZURhlNeZb5yG5NglS_p0K6DY",
    //     "expiresIn": "15m"
    // }

    try {
      const res = await axios.post("/auth/login", formData);
      console.log("Login response:", res);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.accessToken);
      showMessage(res.data.message || "Login successful!", "success");
      // Optionally navigate to dashboard or home page after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  console.log(messageType);

  return (
    // Reintroduced gradient background for desktop, white for mobile, full page width, and allowed scrolling
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-indigo-500 md:to-purple-600 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-auto">
      {/* Tailwind CSS CDN (for utility classes) */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Form container now takes more width on larger screens, removed scaling on hover */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 w-full max-w-md mx-auto transition-all duration-500 ease-in-out">
        <div className="text-center mb-8">
          <LogIn className="mx-auto h-16 w-16 text-indigo-600 mb-4 animate-bounce-in" />
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome Back!
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Log in to your TutorU account
          </p>
        </div>

        {message && (
          <div
            className={`p-3 mb-4 rounded-lg text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } transition-all duration-300 ease-in-out animate-fade-in`}
          >
            {message}
          </div>
        )}

        {/* Form uses a single column layout, suitable for login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {" "}
            {/* Outer div for spacing */}
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              {" "}
              {/* Inner relative div for icon and input */}
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
          </div>

          <div>
            {" "}
            {/* Outer div for spacing */}
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              {" "}
              {/* Inner relative div for icon and input */}
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-800 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-3"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <LogIn className="mr-2" size={20} />
            )}
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          <span>Don't have an account? </span>
          <a
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* Custom CSS for animations (reused from Signup) */}
      <style>
        {`
        @keyframes bounceIn {
          0%, 20%, 40%, 60%, 80%, 100% {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          }
          0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
          }
          20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
          }
          40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
          }
          60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
          }
          80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
          }
          100% {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
          }
        }
        .animate-bounce-in {
          animation: bounceIn 1s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default Login;
