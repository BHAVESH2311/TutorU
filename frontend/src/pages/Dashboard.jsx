import AdminLanding from "./AdminLandingPage";
import ParentsLandingPage from "./ParentsLandingPage";
import StudentLandingPage from "./StudentLandingPage";
import TeacherLanding from "./TeacherLandingPage";
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "student") return <StudentLandingPage />;
  else if (user.role === "teacher") return <TeacherLanding />;
  else if (user.role === "admin") return <AdminLanding />;
  else if (user.role === "parent") return <ParentsLandingPage />;

  return <h1>Invalid User</h1>;
};

export default Dashboard;
