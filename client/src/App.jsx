import React, { useState, useEffect } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/Users";
import Drivers from "./pages/Drivers";
import Login from "./pages/login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [view, setView] = useState(localStorage.getItem("role") === "staff" ? "drivers" : "users");
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [userName, setUserName] = useState(localStorage.getItem("user") || "");

  useEffect(() => {
    // This can stay as an extra check or to handle token expiration/validation later
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", data.user);
    setUserRole(data.role);
    setUserName(data.user);
    setIsAuthenticated(true);

    // Default view based on role
    if (data.role === "staff") {
      setView("drivers");
    } else {
      setView("users");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole("");
    setUserName("");
    setView("users");
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <DashboardLayout
      setView={setView}
      currentView={view}
      userRole={userRole}
      userName={userName}
      onLogout={handleLogout}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
          Logged in as: <span className="text-indigo-600 uppercase">{userName}</span> ({userRole})
        </p>
      </div>

      {view === "users" && userRole === "superuser" && <Users />}
      {view === "drivers" && <Drivers />}

      {view === "users" && userRole !== "superuser" && (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
          <h2 className="text-red-700 font-bold text-xl uppercase">Access Denied</h2>
          <p className="text-red-600 mt-2">You do not have permission to view User Management.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default App;