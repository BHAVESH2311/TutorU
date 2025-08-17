import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  ClipboardCheck,
  Award,
  BarChart,
  Upload,
  MessageSquare,
  ChevronRight,
  Home,
  Users,
  Star,
  RefreshCcw,
} from "lucide-react";

// Mock API calls to simulate backend interaction
const api = {
  // Simulate fetching a student's dashboard summary
  fetchDashboardSummary: async (userId) => {
    console.log("Fetching dashboard summary for:", userId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Rahul Singh",
          upcomingSession: {
            tutorName: "Priya Sharma",
            subject: "Mathematics",
            scheduledTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
          },
          lastSession: {
            tutorName: "Jane Doe",
            subject: "Science",
            rating: 4,
          },
          monthlyProgress: "15%",
        });
      }, 500);
    });
  },

  // Simulate fetching all student data for all sections
  fetchStudentData: async (userId) => {
    console.log("Fetching all student data for:", userId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          schedule: [
            {
              id: "sess1",
              tutor: { name: "Priya Sharma", subject: "Mathematics" },
              date: "2024-08-18",
              time: "16:00",
              status: "scheduled",
            },
            {
              id: "sess2",
              tutor: { name: "Jane Doe", subject: "Science" },
              date: "2024-08-19",
              time: "10:00",
              status: "scheduled",
            },
          ],
          tutors: [
            {
              id: "tutor1",
              name: "Priya Sharma",
              subject: "Mathematics",
              qualification: "M.Sc. Maths",
              experience: 5,
            },
            {
              id: "tutor2",
              name: "Jane Doe",
              subject: "Science",
              qualification: "B.Tech",
              experience: 8,
            },
          ],
          syllabus: {
            institute: [
              {
                chapter: "Algebra",
                topics: [
                  { name: "Equations", status: "completed" },
                  { name: "Functions", status: "ongoing" },
                ],
              },
              {
                chapter: "Geometry",
                topics: [{ name: "Trigonometry", status: "ongoing" }],
              },
            ],
            school: [
              {
                chapter: "Algebra",
                topics: [
                  { name: "Equations", status: "completed" },
                  { name: "Functions", status: "completed" },
                ],
              },
            ],
          },
          tests: [
            {
              id: "test1",
              name: "Algebra Session Test",
              marks: "12/15",
              date: "2024-08-17",
            },
            {
              id: "test2",
              name: "Weekly Math Test",
              marks: "35/40",
              date: "2024-08-10",
            },
          ],
          progress: {
            math: "85%",
            science: "90%",
            english: "78%",
          },
          vacations: [{ startDate: "2024-12-24", endDate: "2024-12-31" }],
          examTimetable: [{ subject: "Physics", date: "2024-09-15" }],
        });
      }, 500);
    });
  },

  // Simulate updating school syllabus
  updateSchoolSyllabus: async (userId, syllabus) => {
    console.log("Updating school syllabus for:", userId, syllabus);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            message: "School syllabus updated successfully.",
          });
        } else {
          reject({ success: false, message: "Failed to update syllabus." });
        }
      }, 500);
    });
  },

  // Simulate updating other editable items
  updateStudentData: async (userId, data) => {
    console.log("Updating student data for:", userId, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Data updated successfully." });
      }, 500);
    });
  },
};

// Main Student Dashboard Component
const StudentDashboard = () => {
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
        const allData = await api.fetchStudentData(user.id);
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
      await api.updateStudentData(user.id, { [type]: updatedData });
      const updatedAllData = await api.fetchStudentData(user.id);
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
        return <StudentSchedule schedule={data.schedule} />;
      case "syllabus":
        return (
          <StudentSyllabus syllabus={data.syllabus} onUpdate={handleUpdate} />
        );
      case "tutors":
        return <StudentTutors tutors={data.tutors} />;
      case "tests":
        return <StudentTests tests={data.tests} />;
      case "progress":
        return <ProgressAndRatings progress={data.progress} />;
      case "uploads":
        return (
          <StudentUploads
            examTimetable={data.examTimetable}
            vacations={data.vacations}
            onUpdate={handleUpdate}
          />
        );
      default:
        return <DashboardHome summary={summary} data={data} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <StudentNavbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        name={user?.name || "Student"}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {summary?.name}!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            This is your personalized academic dashboard.
          </p>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

// Individual Dashboard Components
const StudentNavbar = ({ activeSection, setActiveSection, name }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Home", icon: <Home />, id: "home" },
    { name: "Schedule", icon: <Calendar />, id: "schedule" },
    { name: "Syllabus", icon: <BookOpen />, id: "syllabus" },
    { name: "Tutors", icon: <Users />, id: "tutors" },
    { name: "Tests & Worksheets", icon: <ClipboardCheck />, id: "tests" },
    { name: "Progress & Ratings", icon: <BarChart />, id: "progress" },
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
            <span className="text-indigo-600 font-bold text-xl">S</span>
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

const DashboardHome = ({ summary }) => (
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
          with {summary?.upcomingSession?.tutorName}
        </div>
        <div className="mt-2 text-xs opacity-70">
          {new Date(summary?.upcomingSession?.scheduledTime).toLocaleString()}
        </div>
      </div>
      <Calendar size={60} className="opacity-20" />
    </div>

    {/* Monthly Progress Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Monthly Progress
        </div>
        <div className="text-2xl font-bold text-green-600">
          + {summary?.monthlyProgress}
        </div>
        <div className="mt-1 text-sm text-gray-600">compared to last month</div>
      </div>
      <BarChart size={60} className="text-gray-200" />
    </div>

    {/* Last Session Rating Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Last Session Rating
        </div>
        <div className="flex items-center text-amber-500">
          {[...Array(summary?.lastSession?.rating)].map((_, i) => (
            <Star key={i} size={24} className="fill-amber-500" />
          ))}
          <span className="text-2xl font-bold ml-2">
            {summary?.lastSession?.rating}.0
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-600">
          {summary?.lastSession?.subject} with {summary?.lastSession?.tutorName}
        </div>
      </div>
      <MessageSquare size={60} className="text-gray-200" />
    </div>
  </div>
);

const StudentSchedule = ({ schedule }) => (
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
              Tutor
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
                {session.tutor.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {session.tutor.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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

const StudentSyllabus = ({ syllabus, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("institute");
  const [schoolSyllabus, setSchoolSyllabus] = useState(syllabus.school);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (chapterIndex, topicIndex) => {
    const newSyllabus = [...schoolSyllabus];
    const currentStatus = newSyllabus[chapterIndex].topics[topicIndex].status;
    newSyllabus[chapterIndex].topics[topicIndex].status =
      currentStatus === "completed" ? "ongoing" : "completed";
    setSchoolSyllabus(newSyllabus);
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await onUpdate("schoolSyllabus", schoolSyllabus);
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
      {data.map((chapter, chapIndex) => (
        <div key={chapIndex} className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg text-gray-800 mb-2">
            {chapter.chapter}
          </h4>
          <ul className="space-y-2">
            {chapter.topics.map((topic, topicIndex) => (
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
        Syllabus Progress
      </h2>
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("institute")}
          className={`pb-2 px-4 font-semibold border-b-2 transition-colors duration-200 ${
            activeTab === "institute"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Institute Syllabus
        </button>
        <button
          onClick={() => setActiveTab("school")}
          className={`pb-2 px-4 font-semibold border-b-2 transition-colors duration-200 ${
            activeTab === "school"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          School Syllabus
        </button>
      </div>

      {activeTab === "institute" && (
        <div>
          <p className="text-gray-600 mb-4">
            This is the syllabus completion status updated by your tutors.
          </p>
          {renderSyllabus(syllabus.institute, false)}
        </div>
      )}

      {activeTab === "school" && (
        <div>
          <p className="text-gray-600 mb-4">
            Update your own school syllabus progress here.
          </p>
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
          {renderSyllabus(schoolSyllabus, true)}
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
      )}
    </div>
  );
};

const StudentTutors = ({ tutors }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Tutors</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.map((tutor) => (
        <div key={tutor.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900">{tutor.name}</h3>
          <p className="text-indigo-600 font-medium">{tutor.subject}</p>
          <p className="text-sm text-gray-600 mt-2">
            Qualification: {tutor.qualification}
          </p>
          <p className="text-sm text-gray-600">
            Experience: {tutor.experience} years
          </p>
          <button className="mt-4 px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors">
            View Profile
          </button>
        </div>
      ))}
    </div>
  </div>
);

const StudentTests = ({ tests }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      Tests & Worksheets
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Tests Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-xl text-gray-900 flex items-center mb-4">
          <ClipboardCheck className="mr-2 text-green-600" /> My Tests
        </h3>
        <ul className="space-y-4">
          {tests.map((test) => (
            <li
              key={test.id}
              className="p-4 bg-white rounded-lg border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{test.name}</span>
                <span className="text-sm font-semibold text-green-600">
                  {test.marks}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Completed on {test.date}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Worksheets Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-xl text-gray-900 flex items-center mb-4">
          <BookOpen className="mr-2 text-purple-600" /> Worksheets
        </h3>
        <p className="text-gray-600 mb-4">
          Worksheets are available here for extra practice.
        </p>
        <button className="w-full py-3 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors">
          Browse Worksheets
        </button>
      </div>
    </div>
  </div>
);

const ProgressAndRatings = ({ progress }) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingSubmit = () => {
    console.log("Submitting rating:", rating);
    setIsSubmitted(true);
    // Here you would make an API call to submit the rating.
    // Simulating success
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0); // Reset after submission
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Progress & Ratings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monthly Progress Chart */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl text-gray-900 flex items-center mb-4">
            <BarChart className="mr-2 text-blue-600" /> Monthly Progress
          </h3>
          <p className="text-gray-600 mb-4">
            Your progress across different subjects.
          </p>
          <div className="space-y-4">
            {Object.entries(progress).map(([subject, percentage], index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{subject}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {percentage}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Rating Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl text-gray-900 flex items-center mb-4">
            <Star className="mr-2 text-amber-500" /> Rate a Session
          </h3>
          <p className="text-gray-600 mb-4">
            Your feedback helps us improve your learning experience.
          </p>
          <div className="flex justify-center my-4 space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  size={40}
                  className={
                    star <= rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
          <p className="text-center text-gray-500 mb-4">
            Current Rating: {rating} / 5
          </p>
          <button
            onClick={handleRatingSubmit}
            disabled={rating === 0 || isSubmitted}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentUploads = ({ vacations, onUpdate }) => {
  const [examFile, setExamFile] = useState(null);
  const [vacationDates, setVacationDates] = useState(vacations);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setExamFile(e.target.files[0]);
  };

  const handleVacationChange = (index, field, value) => {
    const newDates = [...vacationDates];
    newDates[index][field] = value;
    setVacationDates(newDates);
  };

  const handleAddVacation = () => {
    setVacationDates([...vacationDates, { startDate: "", endDate: "" }]);
  };

  const handleSave = async (type) => {
    setLoading(true);
    let result;
    if (type === "exam") {
      // Simulate file upload with dummy data
      const dataToSave = {
        file: examFile ? examFile.name : null,
      };
      result = await onUpdate("examTimetable", dataToSave);
    } else {
      result = await onUpdate("vacations", vacationDates);
    }

    setLoading(false);
    if (result.success) {
      setMessage(`Successfully updated ${type}.`);
      setMessageType("success");
    } else {
      setMessage(result.message || `Failed to update ${type}.`);
      setMessageType("error");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Uploads</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam Timetable Upload */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl text-gray-900 flex items-center mb-4">
            <Upload className="mr-2 text-indigo-600" /> School Exam Timetable
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your exam schedule to keep your tutors informed.
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
          />
          <button
            onClick={() => handleSave("exam")}
            disabled={loading}
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Timetable"}
          </button>
        </div>

        {/* Vacations */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl text-gray-900 flex items-center mb-4">
            <RefreshCcw className="mr-2 text-blue-600" /> Vacations
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Let your tutors know when you'll be on vacation.
          </p>
          <div className="space-y-4">
            {vacationDates.map((vacation, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="date"
                  value={vacation.startDate}
                  onChange={(e) =>
                    handleVacationChange(index, "startDate", e.target.value)
                  }
                  className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm"
                />
                <span>to</span>
                <input
                  type="date"
                  value={vacation.endDate}
                  onChange={(e) =>
                    handleVacationChange(index, "endDate", e.target.value)
                  }
                  className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddVacation}
            className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Add Another Vacation
          </button>
          <button
            onClick={() => handleSave("vacations")}
            disabled={loading}
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Vacations"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
