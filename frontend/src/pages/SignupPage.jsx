import React, { useState } from "react";
// createRoot and ReactDOM.render are removed as per request,
// assuming a parent component will handle rendering.
import {
  Mail,
  Lock,
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  School,
  ClipboardList,
  UserPlus,
} from "lucide-react";

// Assume axios is configured correctly and available
import axios from "../api/axios"; // Uncommented this line to use actual axios

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role
    profileData: {}, // Nested object for role-specific data
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  // Handle changes for main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset profileData when role changes to clear previous role's fields
    if (name === "role") {
      setFormData((prevData) => ({
        ...prevData,
        role: value,
        profileData: {}, // Reset profileData
      }));
    }
  };

  // Handle changes for role-specific profile data
  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      profileData: {
        ...prevData.profileData,
        [name]: value,
      },
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

    // Basic validation for common fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      showMessage("Please fill in all required fields.", "error");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      showMessage("Password must be at least 6 characters long.", "error");
      setLoading(false);
      return;
    }

    // Prepare data for API call
    const dataToSend = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      profileData: {
        name: formData.name, // Name is common to all profiles
        ...formData.profileData, // Add role-specific data
      },
    };

    // Convert array-like strings to actual arrays for backend
    if (formData.role === "tutor") {
      if (
        dataToSend.profileData.gradesTaught &&
        typeof dataToSend.profileData.gradesTaught === "string"
      ) {
        dataToSend.profileData.gradesTaught = dataToSend.profileData.gradesTaught
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);
      }
      if (
        dataToSend.profileData.subjectsTaught &&
        typeof dataToSend.profileData.subjectsTaught === "string"
      ) {
        dataToSend.profileData.subjectsTaught = dataToSend.profileData.subjectsTaught
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);
      }
    }
    // Add similar logic for student/parent if they have array fields

    try {
      const res = await axios.post("/auth/signup", dataToSend);
      showMessage(
        res.data.message || "Signup successful! You can now log in.",
        "success"
      );
      // Optionally navigate to login page after successful signup
      // navigate('/login');
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // Render role-specific fields
  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "tutor":
        return (
          <>
            <div>
              {" "}
              {/* Wrapper div for label and input */}
              <label
                htmlFor="experience"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Experience (Years)
              </label>
              <div className="relative">
                {" "}
                {/* New relative div for icon and input */}
                <Briefcase
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                  placeholder="e.g., 5"
                  onChange={handleProfileDataChange}
                  value={formData.profileData.experience || ""}
                  required
                />
              </div>
            </div>
            <div>
              {" "}
              {/* Wrapper div for label and input */}
              <label
                htmlFor="qualification"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Qualification
              </label>
              <div className="relative">
                {" "}
                {/* New relative div for icon and input */}
                <Award
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                  placeholder="e.g., M.Sc. Physics"
                  onChange={handleProfileDataChange}
                  value={formData.profileData.qualification || ""}
                  required
                />
              </div>
            </div>
            <div>
              {" "}
              {/* Wrapper div for label and input */}
              <label
                htmlFor="gradesTaught"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Grades Taught (comma-separated)
              </label>
              <div className="relative">
                {" "}
                {/* New relative div for icon and input */}
                <School
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="gradesTaught"
                  id="gradesTaught"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                  placeholder="e.g., Grade 5, Grade 10"
                  onChange={handleProfileDataChange}
                  value={formData.profileData.gradesTaught || ""}
                  required
                />
              </div>
            </div>
            <div>
              {" "}
              {/* Wrapper div for label and input */}
              <label
                htmlFor="subjectsTaught"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Subjects Taught (comma-separated)
              </label>
              <div className="relative">
                {" "}
                {/* New relative div for icon and input */}
                <BookOpen
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="subjectsTaught"
                  id="subjectsTaught"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                  placeholder="e.g., Math, Science"
                  onChange={handleProfileDataChange}
                  value={formData.profileData.subjectsTaught || ""}
                  required
                />
              </div>
            </div>
          </>
        );
      case "student":
        return (
          <>
            <div>
              {" "}
              {/* Wrapper div for label and input */}
              <label
                htmlFor="grade"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Grade
              </label>
              <div className="relative">
                {" "}
                {/* New relative div for icon and input */}
                <GraduationCap
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="grade"
                  id="grade"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                  placeholder="e.g., 10th"
                  onChange={handleProfileDataChange}
                  value={formData.profileData.grade || ""}
                  required
                />
              </div>
            </div>
            <div>
              {" "}
              {/* Wrapper div for label and input */}
              <label
                htmlFor="board"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Board
              </label>
              <div className="relative">
                {" "}
                {/* New relative div for icon and input */}
                <ClipboardList
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="board"
                  id="board"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                  placeholder="e.g., CBSE, ICSE"
                  onChange={handleProfileDataChange}
                  value={formData.profileData.board || ""}
                  required
                />
              </div>
            </div>
          </>
        );
      case "parent":
        return (
          <>
            {/* Parent doesn't have specific required profile data beyond name for signup,
                but you might add fields like 'phone' or 'address' here if needed.
                Children will be linked later. */}
            <div className="md:col-span-2 text-center text-gray-600 text-sm italic py-4">
              Additional details for parents can be added after registration.
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    // Reintroduced gradient background for desktop, white for mobile, full page width, and allowed scrolling
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-indigo-500 md:to-purple-600 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-auto">
      {/* Tailwind CSS CDN (for utility classes) */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Form container now takes more width on larger screens, removed scaling on hover */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 w-full lg:max-w-4xl xl:max-w-5xl mx-auto transition-all duration-500 ease-in-out">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto h-16 w-16 text-indigo-600 mb-4 animate-bounce-in" />
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Join TutorU
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Start your personalized learning journey
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

        {/* Form now uses a responsive grid layout */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        >
          <div>
            {" "}
            {/* Outer div for grid spacing */}
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="relative">
              {" "}
              {/* Inner relative div for icon and input */}
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
                placeholder="Your Full Name"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
          </div>

          <div>
            {" "}
            {/* Outer div for grid spacing */}
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
            {/* Outer div for grid spacing */}
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
                placeholder="Create Password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Register As:
            </label>
            <div className="relative">
              {" "}
              {/* This relative div already existed and was correct */}
              <Users
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                name="role"
                id="role"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm appearance-none"
                onChange={handleChange}
                value={formData.role}
                required
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="parent">Parent</option>
                {/* Admin role typically not for public signup */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Role-specific fields - these will naturally flow into the grid */}
          {renderRoleSpecificFields()}

          {/* Submit button and login link now span two columns on medium screens and up */}
          <div className="md:col-span-2">
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
                <UserPlus className="mr-2" size={20} />
              )}
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <div className="md:col-span-2 text-center mt-2 text-gray-600">
            <span>Already have an account? </span>
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
            >
              Log In
            </a>
          </div>
        </form>
      </div>

      {/* Custom CSS for bounce-in animation */}
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

export default Signup;
