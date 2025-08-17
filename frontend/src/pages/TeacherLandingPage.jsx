import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ClipboardCheck,
  DollarSign,
  Users,
  Home,
  BookOpen,
  Bell,
  MapPin,
  RefreshCcw,
} from "lucide-react";

// Mock API calls to simulate backend interaction
const api = {
  // Simulate fetching a tutor's dashboard summary
  fetchDashboardSummary: async (tutorId) => {
    console.log("Fetching dashboard summary for:", tutorId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Priya Sharma",
          upcomingSession: {
            studentName: "Rahul Singh",
            subject: "Mathematics",
            scheduledTime: new Date(Date.now() + 3600000).toISOString(),
            location: "123 Learning Street",
          },
          totalStudents: 15,
          totalSessions: 55,
          monthlyPayout: 1200,
        });
      }, 500);
    });
  },

  // Simulate fetching all tutor data
  fetchTutorData: async (tutorId) => {
    console.log("Fetching all tutor data for:", tutorId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          schedule: [
            {
              id: "sess1",
              student: { name: "Rahul Singh", grade: "10th" },
              subject: "Mathematics",
              date: "2024-08-18",
              time: "16:00",
              status: "scheduled",
            },
            {
              id: "sess2",
              student: { name: "Anjali Mehta", grade: "8th" },
              subject: "Science",
              date: "2024-08-19",
              time: "10:00",
              status: "rescheduled",
            },
          ],
          students: [
            {
              id: "student1",
              name: "Rahul Singh",
              grade: "10th",
              board: "CBSE",
              subject: "Mathematics",
              desiredSessions: 10,
              actualSessions: 8,
              lastSessionRating: 5,
            },
            {
              id: "student2",
              name: "Anjali Mehta",
              grade: "8th",
              board: "ICSE",
              subject: "Science",
              desiredSessions: 8,
              actualSessions: 8,
              lastSessionRating: 4,
            },
          ],
          syllabus: {
            student1: [
              {
                chapter: "Algebra",
                topics: [
                  { name: "Equations", status: "completed" },
                  { name: "Functions", status: "ongoing" },
                ],
                type: "institute",
              },
              {
                chapter: "Algebra",
                topics: [
                  { name: "Equations", status: "completed" },
                  { name: "Functions", status: "completed" },
                ],
                type: "school",
              },
            ],
            student2: [
              {
                chapter: "Physics",
                topics: [
                  { name: "Motion", status: "completed" },
                  { name: "Force", status: "completed" },
                ],
                type: "institute",
              },
              {
                chapter: "Physics",
                topics: [
                  { name: "Motion", status: "completed" },
                  { name: "Force", status: "ongoing" },
                ],
                type: "school",
              },
            ],
          },
          payouts: [
            { month: "August", amount: 1200, status: "pending" },
            { month: "July", amount: 1500, status: "paid" },
          ],
        });
      }, 500);
    });
  },

  // Simulate updating institute syllabus
  updateInstituteSyllabus: async (tutorId, studentId, syllabus) => {
    console.log("Updating institute syllabus for:", studentId, syllabus);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({ success: true, message: "Syllabus updated successfully." });
        } else {
          reject({ success: false, message: "Failed to update syllabus." });
        }
      }, 500);
    });
  },

  // Simulate punching attendance
  punchAttendance: async (sessionId, type) => {
    console.log(`Punching ${type} for session:`, sessionId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Attendance punched ${type}.` });
      }, 500);
    });
  },

  // Simulate rating student attentiveness
  rateStudent: async (sessionId, rating) => {
    console.log(
      "Rating student for session:",
      sessionId,
      "with rating:",
      rating
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Student rated successfully." });
      }, 500);
    });
  },
};

// Main Tutor Dashboard Component
const TutorDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [summary, setSummary] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboardSummary = await api.fetchDashboardSummary(user.id);
        const allData = await api.fetchTutorData(user.id);
        setSummary(dashboardSummary);
        setData(allData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  const handleUpdate = async (type, updatedData) => {
    try {
      await api.updateInstituteSyllabus(
        user.id,
        updatedData.studentId,
        updatedData.syllabus
      );
      const updatedAllData = await api.fetchTutorData(user.id);
      setData(updatedAllData);
      return { success: true };
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
      return { success: false, message: "Failed to save data." };
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
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
          <span className="ml-4 text-gray-600">Loading your dashboard...</span>
        </div>
      );
    }

    switch (activeSection) {
      case "home":
        return <DashboardHome summary={summary} data={data} />;
      case "schedule":
        return <TutorSchedule schedule={data.schedule} />;
      case "students":
        return <TutorStudents students={data.students} />;
      case "syllabus":
        return (
          <TutorSyllabus
            students={data.students}
            syllabusData={data.syllabus}
            onUpdate={handleUpdate}
          />
        );
      case "attendance":
        return <TutorAttendance />;
      case "payouts":
        return <TutorPayouts payouts={data.payouts} />;
      default:
        return <DashboardHome summary={summary} data={data} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <TutorNavbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        name={user?.name || "Tutor"}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {summary?.name}!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            This is your personalized teaching dashboard.
          </p>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

const TutorNavbar = ({ activeSection, setActiveSection, name }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Home", icon: <Home />, id: "home" },
    { name: "Schedule", icon: <Calendar />, id: "schedule" },
    { name: "Students", icon: <Users />, id: "students" },
    { name: "Syllabus", icon: <BookOpen />, id: "syllabus" },
    { name: "Attendance", icon: <MapPin />, id: "attendance" },
    { name: "Payouts", icon: <DollarSign />, id: "payouts" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-xl">T</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{name}</span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="w-full text-left text-gray-600 hover:text-red-500 transition-colors p-3 mt-4"
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out mr-3"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" x2="9" y1="12" y2="12"></line>
          </svg>
          Log Out
        </span>
      </button>
    </nav>
  );
};

const DashboardHome = ({ summary, data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Upcoming Session Card */}
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium opacity-80 mb-1">
          Upcoming Session
        </div>
        <div className="text-2xl font-bold">
          {summary?.upcomingSession?.subject}
        </div>
        <div className="mt-1 text-sm opacity-90">
          with {summary?.upcomingSession?.studentName}
        </div>
        <div className="mt-2 text-xs opacity-70">
          {new Date(summary?.upcomingSession?.scheduledTime).toLocaleString()}
        </div>
      </div>
      <Calendar size={60} className="opacity-20" />
    </div>

    {/* Total Students Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Total Students
        </div>
        <div className="text-3xl font-bold text-green-600">
          {summary?.totalStudents}
        </div>
        <div className="mt-1 text-sm text-gray-600">Actively taught</div>
      </div>
      <Users size={60} className="text-gray-200" />
    </div>

    {/* Monthly Payout Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Monthly Payout
        </div>
        <div className="flex items-center text-amber-500">
          <span className="text-2xl font-bold">${summary?.monthlyPayout}</span>
        </div>
        <div className="mt-1 text-sm text-gray-600">
          Payout status: {data?.payouts?.[0]?.status}
        </div>
      </div>
      <DollarSign size={60} className="text-gray-200" />
    </div>
  </div>
);

const TutorSchedule = ({ schedule }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Schedule</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedule.map((session) => (
            <tr key={session.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {session.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {session.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                {session.student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {session.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    session.status === "scheduled"
                      ? "bg-green-100 text-green-800"
                      : session.status === "rescheduled"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {session.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TutorStudents = ({ students }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Students</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <div key={student.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
          <p className="text-indigo-600 font-medium">
            {student.grade} - {student.subject}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Desired Sessions:{" "}
              <span className="font-semibold text-gray-800">
                {student.desiredSessions}
              </span>
            </p>
            <p>
              Actual Sessions:{" "}
              <span className="font-semibold text-green-600">
                {student.actualSessions}
              </span>
            </p>
          </div>
          <button className="mt-4 px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors">
            View Progress
          </button>
        </div>
      ))}
    </div>
  </div>
);

const TutorSyllabus = ({ students, syllabusData, onUpdate }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(students?.[0]?.id);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedSyllabus = syllabusData[selectedStudentId] || [];

  const handleTopicChange = (chapIndex, topicIndex) => {
    const newSyllabus = JSON.parse(JSON.stringify(selectedSyllabus));
    const instituteSyllabus = newSyllabus.find((s) => s.type === "institute");
    if (!instituteSyllabus) return;

    const currentStatus = instituteSyllabus.topics[topicIndex].status;
    instituteSyllabus.topics[topicIndex].status =
      currentStatus === "completed" ? "ongoing" : "completed";

    // Simulate updating the state with the modified syllabus

    onUpdate("syllabus", {
      studentId: selectedStudentId,
      syllabus: newSyllabus,
    });

    setMessage("Syllabus state updated, click save to submit.");
    setMessageType("info");
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await onUpdate("syllabus", {
      studentId: selectedStudentId,
      syllabus: selectedSyllabus,
    });
    setLoading(false);
    if (result.success) {
      setMessage("Syllabus saved successfully!");
      setMessageType("success");
    } else {
      setMessage(result.message || "Failed to save syllabus.");
      setMessageType("error");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const renderSyllabus = (data, isEditable) => (
    <div className="space-y-6">
      {data.map((syllabus, chapIndex) => (
        <div key={chapIndex} className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg text-gray-800 mb-2">
            {syllabus.chapter} ({syllabus.type})
          </h4>
          <ul className="space-y-2">
            {syllabus.topics.map((topic, topicIndex) => (
              <li
                key={topicIndex}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{topic.name}</span>
                {isEditable ? (
                  <button
                    onClick={() => handleTopicChange(chapIndex, topicIndex)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      topic.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {topic.status === "completed" ? "Completed" : "Ongoing"}
                  </button>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      topic.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {topic.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Syllabus Management
      </h2>
      <div className="mb-4">
        <label
          htmlFor="student-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Student:
        </label>
        <select
          id="student-select"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <div
          className={`p-3 mb-4 rounded-lg text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : messageType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {message}
        </div>
      )}

      {selectedSyllabus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Institute Syllabus (Editable)
            </h3>
            {renderSyllabus(
              selectedSyllabus.filter((s) => s.type === "institute"),
              true
            )}
            <div className="mt-6 text-right">
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Updates"}
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              School Syllabus (View Only)
            </h3>
            {renderSyllabus(
              selectedSyllabus.filter((s) => s.type === "school"),
              false
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No syllabus information available for this student.
        </p>
      )}
    </div>
  );
};

const TutorAttendance = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePunch = async (type) => {
    setLoading(true);
    const sessionId = "mockSession123"; // Replace with actual session ID
    const result = await api.punchAttendance(sessionId, type);
    setLoading(false);
    if (result.success) {
      setMessage(result.message);
      setMessageType("success");
      setIsPunchedIn(type === "in");
    } else {
      setMessage(result.message || "Failed to punch attendance.");
      setMessageType("error");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance</h2>
      {message && (
        <div
          className={`p-3 mb-4 rounded-lg text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <div className="flex flex-col items-center justify-center space-y-6">
        <MapPin size={80} className="text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Current Status: {isPunchedIn ? "Punched In" : "Punched Out"}
        </h3>
        {!isPunchedIn ? (
          <button
            onClick={() => handlePunch("in")}
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Punching In..." : "Punch In"}
          </button>
        ) : (
          <button
            onClick={() => handlePunch("out")}
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Punching Out..." : "Punch Out"}
          </button>
        )}
      </div>
    </div>
  );
};

const TutorPayouts = ({ payouts }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Payouts</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Month
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payouts.map((payout, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payout.month}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${payout.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payout.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {payout.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TutorDashboard;
