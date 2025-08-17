import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  Home,
  User,
  CreditCard,
  Bell,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";

// Mock API calls to simulate backend interaction
const api = {
  // Simulate fetching a admin's dashboard summary
  fetchAdminData: async () => {
    console.log("Fetching admin data");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: {
            totalUsers: 150,
            activeSessions: 25,
            paymentsDue: 3,
            totalAlerts: 12,
          },
          users: [
            {
              id: "user1",
              name: "Priya Sharma",
              role: "tutor",
              status: "active",
            },
            {
              id: "user2",
              name: "Rahul Singh",
              role: "student",
              status: "active",
            },
            {
              id: "user3",
              name: "Anita Devi",
              role: "parent",
              status: "active",
            },
            { id: "user4", name: "John Doe", role: "admin", status: "active" },
            {
              id: "user5",
              name: "Anjali Mehta",
              role: "student",
              status: "inactive",
            },
          ],
          payments: [
            {
              id: "pay1",
              user: "Rahul Singh",
              amount: 500,
              status: "due",
              dueDate: "2024-09-01",
            },
            {
              id: "pay2",
              user: "Priya Sharma",
              amount: 1200,
              status: "pending",
              dueDate: "2024-08-31",
            },
            {
              id: "pay3",
              user: "Jane Doe",
              amount: 1500,
              status: "paid",
              paidDate: "2024-08-10",
            },
          ],
          alerts: [
            {
              id: "alert1",
              message: "Session with Anjali Mehta was cancelled.",
              type: "cancellation",
              date: "2024-08-17",
            },
            {
              id: "alert2",
              message: "Tutor fees are due for Rahul Singh.",
              type: "payment",
              date: "2024-08-15",
            },
            {
              id: "alert3",
              message: "Chemistry chapter completed by Priya Sharma.",
              type: "completion",
              date: "2024-08-14",
            },
          ],
        });
      }, 500);
    });
  },

  // Simulate updating a user
  updateUser: async (userId, newDetails) => {
    console.log("Updating user:", userId, newDetails);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({ success: true, message: "User updated successfully." });
        } else {
          reject({ success: false, message: "Failed to update user." });
        }
      }, 500);
    });
  },

  // Simulate updating a payment status
  updatePaymentStatus: async (paymentId, newStatus) => {
    console.log("Updating payment status for:", paymentId, newStatus);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            message: "Payment status updated successfully.",
          });
        } else {
          reject({
            success: false,
            message: "Failed to update payment status.",
          });
        }
      }, 500);
    });
  },
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const adminData = await api.fetchAdminData();
        setData(adminData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (type, payload) => {
    try {
      let result;
      if (type === "user") {
        result = await api.updateUser(payload.id, payload.details);
      } else if (type === "payment") {
        result = await api.updatePaymentStatus(payload.id, payload.status);
      }

      if (result.success) {
        const updatedData = await api.fetchAdminData();
        setData(updatedData);
      }
      return result;
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
        return <AdminHome summary={data.summary} />;
      case "users":
        return <AdminUsers users={data.users} onUpdate={handleUpdate} />;
      case "payments":
        return (
          <AdminPayments payments={data.payments} onUpdate={handleUpdate} />
        );
      case "alerts":
        return <AdminAlerts alerts={data.alerts} />;
      default:
        return <AdminHome summary={data.summary} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <AdminNavbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        name={user?.name || "Admin"}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Full control and oversight of the TutorU platform.
          </p>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

// Sub-Components
const AdminNavbar = ({ activeSection, setActiveSection, name }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Home", icon: <Home />, id: "home" },
    { name: "Users", icon: <Users />, id: "users" },
    { name: "Payments", icon: <CreditCard />, id: "payments" },
    { name: "Alerts", icon: <Bell />, id: "alerts" },
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
            <span className="text-indigo-600 font-bold text-xl">A</span>
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

const AdminHome = ({ summary }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Total Users Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Total Users
        </div>
        <div className="text-3xl font-bold text-indigo-600">
          {summary?.totalUsers}
        </div>
      </div>
      <Users size={60} className="text-gray-200" />
    </div>

    {/* Active Sessions Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Active Sessions
        </div>
        <div className="text-3xl font-bold text-green-600">
          {summary?.activeSessions}
        </div>
      </div>
      <Calendar size={60} className="text-gray-200" />
    </div>

    {/* Payments Due Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Payments Due
        </div>
        <div className="text-3xl font-bold text-red-600">
          {summary?.paymentsDue}
        </div>
      </div>
      <DollarSign size={60} className="text-gray-200" />
    </div>

    {/* Total Alerts Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">
          Total Alerts
        </div>
        <div className="text-3xl font-bold text-yellow-600">
          {summary?.totalAlerts}
        </div>
      </div>
      <AlertTriangle size={60} className="text-gray-200" />
    </div>
  </div>
);

const AdminUsers = ({ users, onUpdate }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [editUser, setEditUser] = useState(null);

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const result = await onUpdate("user", {
      id: editUser.id,
      details: editUser,
    });
    if (result.success) {
      setMessage("User updated successfully!");
      setMessageType("success");
      setEditUser(null);
    } else {
      setMessage(result.message || "Failed to update user.");
      setMessageType("error");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={editUser.status}
                  onChange={(e) =>
                    setEditUser({ ...editUser, status: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPayments = ({ payments, onUpdate }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (paymentId, newStatus) => {
    setLoading(true);
    const result = await onUpdate("payment", {
      id: paymentId,
      status: newStatus,
    });
    setLoading(false);
    if (result.success) {
      setMessage(`Payment updated to '${newStatus}' successfully!`);
      setMessageType("success");
    } else {
      setMessage(result.message || "Failed to update payment.");
      setMessageType("error");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Payment Overview
      </h2>
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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "due"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.dueDate || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {payment.status !== "paid" && (
                    <button
                      onClick={() => handleUpdateStatus(payment.id, "paid")}
                      className="text-green-600 hover:text-green-900"
                      disabled={loading}
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                  {payment.status !== "cancelled" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(payment.id, "cancelled")
                      }
                      className="text-red-600 hover:text-red-900"
                      disabled={loading}
                    >
                      <XCircle size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminAlerts = ({ alerts }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">System Alerts</h2>
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm"
        >
          <AlertIcon type={alert.type} />
          <div className="ml-4 flex-1">
            <div className="font-semibold text-gray-800">{alert.message}</div>
            <div className="text-sm text-gray-500 mt-1">{alert.date}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AlertIcon = ({ type }) => {
  switch (type) {
    case "cancellation":
      return <XCircle size={24} className="text-red-500" />;
    case "payment":
      return <DollarSign size={24} className="text-yellow-500" />;
    case "completion":
      return <CheckCircle size={24} className="text-green-500" />;
    default:
      return <Bell size={24} className="text-gray-500" />;
  }
};

export default AdminDashboard;
