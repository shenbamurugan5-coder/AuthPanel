import React from "react";

const DashboardLayout = ({ children, setView, currentView, onLogout, userRole }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-gray-100 flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            🚀 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Admin Panel</span>
          </h2>
        </div>
        <ul className="flex-1 p-4 space-y-2">
          {userRole === "superuser" && (
            <li
              onClick={() => setView("users")}
              className={`cursor-pointer p-4 rounded-lg flex items-center gap-3 font-semibold transition-all ${currentView === "users" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "hover:bg-gray-800 text-gray-400 hover:text-white"}`}
            >
              👤 Users
            </li>
          )}
          <li
            onClick={() => setView("drivers")}
            className={`cursor-pointer p-4 rounded-lg flex items-center gap-3 font-semibold transition-all ${currentView === "drivers" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "hover:bg-gray-800 text-gray-400 hover:text-white"}`}
          >
            🚚 Drivers
          </li>
        </ul>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full p-3 rounded-lg flex items-center justify-center gap-2 font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-red-900/50"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;