import React from "react";
import { useNavigate, Link } from "react-router-dom";

// Lucide-react icons for visual appeal
import {
  BookOpen,
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  Bell,
  Award,
  UserCheck,
  CreditCard,
  BarChart,
  FileText,
  Upload,
  Clock,
  CheckCircle,
  Target,
  Contact,
  MessageCircle,
  Clipboard,
  ChevronRight,
  Star,
  Bookmark,
} from "lucide-react";

// Main App component
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <HeroSection navigate={navigate} />
      <FeaturesSection />
      <UserTypeFeatures />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white py-4 sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          className="flex items-center text-2xl font-bold text-indigo-700"
          to="/"
        >
          <BookOpen className="mr-2 text-indigo-600" size={28} />
          TutorU
        </Link>

        {/* Menu */}
        <ul className={`flex items-center m-0`}>
          <li className="nav-item">
            <Link
              className="px-4 py-1.5 rounded-lg border border-indigo-600 text-indigo-600 font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 transition duration-150 shadow-sm no-underline hover:no-underline whitespace-nowrap"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item ms-lg-2 mx-1">
            <Link
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-150 shadow-sm no-underline hover:no-underline ml-2 whitespace-nowrap"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ navigate }) => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-purple-400"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-400"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-400"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Unlock Your Full{" "}
              <span className="text-indigo-200">Learning Potential</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl text-indigo-100">
              Connecting Tutors, Students, and Parents for a Seamless Learning
              Journey. Experience personalized education like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn bg-white text-indigo-700 rounded-full px-8 py-3 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center"
                onClick={() => navigate("signup")}
              >
                Get Started Today <ChevronRight className="ml-2" size={20} />
              </button>
              <button className="btn bg-transparent border-2 border-white text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-indigo-500/20 rounded-full absolute -top-10 -left-10 z-0"></div>
              <div className="w-72 h-72 bg-purple-500/20 rounded-full absolute -bottom-10 -right-10 z-0"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
                <div className="bg-indigo-700 p-4 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-white text-sm font-medium mx-auto">
                    TutorU Dashboard
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <div className="bg-indigo-100 rounded-lg p-3 w-24">
                      <div className="text-indigo-800 font-bold text-center">
                        Math
                      </div>
                      <div className="text-xs text-indigo-600 text-center">
                        95%
                      </div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3 w-24">
                      <div className="text-purple-800 font-bold text-center">
                        Science
                      </div>
                      <div className="text-xs text-purple-600 text-center">
                        87%
                      </div>
                    </div>
                    <div className="bg-amber-100 rounded-lg p-3 w-24">
                      <div className="text-amber-800 font-bold text-center">
                        English
                      </div>
                      <div className="text-xs text-amber-600 text-center">
                        92%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 text-white mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs opacity-80">Next Session</div>
                        <div className="font-bold">Algebra with Priya</div>
                      </div>
                      <div className="bg-white/20 rounded-lg px-3 py-1 text-sm">
                        Today, 4 PM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Progress this week
                    </div>
                    <div className="text-sm font-bold text-indigo-700">
                      +12%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div className="bg-indigo-600 h-2 rounded-full w-9/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Users size={48} className="text-indigo-500 mb-4" />,
      title: "Personalized Learning",
      description:
        "Tailored educational paths to suit every student's unique needs and pace.",
    },
    {
      icon: <Calendar size={48} className="text-green-500 mb-4" />,
      title: "Flexible Scheduling",
      description:
        "Manage and track sessions with ease, offering convenience for all.",
    },
    {
      icon: <Award size={48} className="text-yellow-500 mb-4" />,
      title: "Qualified Tutors",
      description:
        "Access to experienced and highly qualified educators across all subjects and grades.",
    },
    {
      icon: <BarChart size={48} className="text-red-500 mb-4" />,
      title: "Progress Tracking",
      description:
        "Monitor academic growth with detailed reports and syllabus completion status.",
    },
    {
      icon: <Bell size={48} className="text-blue-500 mb-4" />,
      title: "Smart Alerts",
      description:
        "Stay informed with timely notifications for sessions, tests, and important updates.",
    },
    {
      icon: <Clipboard size={48} className="text-purple-500 mb-4" />,
      title: "Integrated Testing",
      description:
        "Conduct session-based and weekly tests to assess understanding effectively.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Powerful Features
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Academic Success
          </h2>
          <p className="text-lg text-gray-600">
            TutorU provides a comprehensive platform designed to enhance the
            learning experience for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// User Type Features Section
const UserTypeFeatures = () => {
  const tutorFeatures = [
    { icon: <UserCheck size={24} />, text: "Manage Profile & Availability" },
    { icon: <Calendar size={24} />, text: "View Student Schedules" },
    { icon: <FileText size={24} />, text: "Update Syllabus Completion" },
    { icon: <Clock size={24} />, text: "Punch In/Out Attendance" },
    { icon: <Bell size={24} />, text: "Receive Session Alerts" },
    { icon: <DollarSign size={24} />, text: "Track Payouts" },
  ];

  const studentFeatures = [
    { icon: <GraduationCap size={24} />, text: "View Tutor Profiles" },
    { icon: <Calendar size={24} />, text: "Manage Personal Schedule" },
    { icon: <Upload size={24} />, text: "Upload School Timetable & Vacations" },
    { icon: <CheckCircle size={24} />, text: "Update School Syllabus" },
    { icon: <Target size={24} />, text: "Take Session & Weekly Tests" },
    { icon: <MessageCircle size={24} />, text: "Rate Tutor Sessions" },
  ];

  const parentFeatures = [
    { icon: <Contact size={24} />, text: "Monitor Child's Progress" },
    { icon: <Calendar size={24} />, text: "Manage Child's Schedule" },
    { icon: <CreditCard size={24} />, text: "View Tuition Fees & Payments" },
    {
      icon: <Upload size={24} />,
      text: "Upload Child's School Timetable & Vacations",
    },
    { icon: <Bell size={24} />, text: "Receive Important Alerts" },
    { icon: <BarChart size={24} />, text: "Track Syllabus Completion" },
  ];

  const renderFeatureList = (features) => (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-gray-700">
          <span className="mt-1 mr-3 text-indigo-500">{feature.icon}</span>
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Tailored Experiences
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Designed for Every User
          </h2>
          <p className="text-lg text-gray-600">
            TutorU provides specialized tools and features for each role in the
            educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tutor Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-2"></div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <Users size={40} className="text-indigo-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Tutors
              </h3>
              <p className="text-gray-600 mb-6">
                Streamline your teaching, manage your students, and track your
                earnings effortlessly.
              </p>
              {renderFeatureList(tutorFeatures)}
              <button className="mt-6 w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors">
                Tutor Features
              </button>
            </div>
          </div>

          {/* Student Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2"></div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <GraduationCap size={40} className="text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Students
              </h3>
              <p className="text-gray-600 mb-6">
                Access personalized learning, track your progress, and excel in
                your studies.
              </p>
              {renderFeatureList(studentFeatures)}
              <button className="mt-6 w-full bg-blue-100 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                Student Features
              </button>
            </div>
          </div>

          {/* Parent Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-2"></div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Contact size={40} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Parents
              </h3>
              <p className="text-gray-600 mb-6">
                Stay informed about your child's academic journey and manage
                their learning experience.
              </p>
              {renderFeatureList(parentFeatures)}
              <button className="mt-6 w-full bg-purple-100 text-purple-700 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                Parent Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "TutorU has transformed how I manage my students. The scheduling and syllabus tracking features are incredibly helpful!",
      author: "Priya Sharma",
      role: "Experienced Math Tutor",
      rating: 5,
    },
    {
      quote:
        "I love how easy it is to track my progress and see what topics my tutor has covered. The tests are also very relevant.",
      author: "Rahul Singh",
      role: "Grade 10 Student",
      rating: 4,
    },
    {
      quote:
        "Being able to see my child's schedule and progress in one place gives me immense peace of mind. Highly recommend!",
      author: "Anita Devi",
      role: "Concerned Parent",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Success Stories
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Users
          </h2>
          <p className="text-lg text-gray-600">
            Hear what our community has to say about their TutorU experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative"
            >
              <div className="absolute top-6 left-6 text-indigo-500 opacity-10">
                <Bookmark size={60} fill="currentColor" />
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6 italic relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h5 className="text-lg font-bold text-gray-900">
                    {testimonial.author}
                  </h5>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Section Component
const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-300"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-indigo-300"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of tutors, students, and parents who are already
            benefiting from TutorU.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn bg-white text-indigo-700 rounded-full px-8 py-3 font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="btn bg-transparent border-2 border-white text-white rounded-full px-8 py-3 font-bold shadow-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center text-2xl font-bold text-white mb-4">
              <BookOpen className="mr-2 text-indigo-400" size={28} />
              TutorU
            </div>
            <p className="text-gray-400 mb-4">
              Your partner in personalized education. Connecting tutors,
              students, and parents for academic success.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-white">Platform</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Students
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Tutors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Parents
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-white">Resources</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h5>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                support@tutoru.com
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                +1 (123) 456-7890
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                123 Education Lane, Learning City
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} TutorU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Placeholder Pages for Routing Demonstration
const AboutPage = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About TutorU
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Revolutionizing education through innovative technology and
            personalized learning experiences.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-4">
                At TutorU, we believe that every learner deserves a personalized
                educational experience. Our mission is to bridge the gap between
                talented tutors, motivated students, and engaged parents through
                a seamless digital platform.
              </p>
              <p className="text-gray-600">
                We're committed to making quality education accessible,
                efficient, and effective for everyone involved in the learning
                journey.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h3>
          <p className="text-gray-600 mb-8">
            We're a passionate team of educators, technologists, and designers
            committed to transforming education.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  Team Member
                </h4>
                <p className="text-gray-600 mb-3">Position</p>
                <p className="text-gray-500 text-sm">
                  Brief description of team member and their role at TutorU.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactPage = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Have questions or need assistance? We're here to help!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-6">
                Fill out the form and our team will get back to you as soon as
                possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600">support@tutoru.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+1 (123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Office</h4>
                    <p className="text-gray-600">
                      123 Education Lane, Learning City
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LoginPage = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BookOpen className="text-indigo-600" size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back to TutorU
          </h2>
          <p className="text-gray-600">
            Sign in to access your personalized dashboard
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="loginEmail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="loginPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your password"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-indigo-600 font-medium hover:text-indigo-800"
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate to register page
                }}
              >
                Register now
              </a>
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Facebook
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RegisterPage = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BookOpen className="text-indigo-600" size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your TutorU Account
          </h2>
          <p className="text-gray-600">
            Join our community of learners and educators
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="registerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="registerName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label
                htmlFor="registerEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="registerEmail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="registerPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="registerPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm your password"
              />
            </div>
            <div>
              <label
                htmlFor="userRole"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                I am a
              </label>
              <select
                id="userRole"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="#"
                className="text-indigo-600 font-medium hover:text-indigo-800"
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate to login page
                }}
              >
                Sign in
              </a>
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Facebook
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LandingPage;
