import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );

      // res.data should contain { token, role, user }
      if (onLoginSuccess) {
        onLoginSuccess(res.data);
      }
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message);
      alert("Login failed: " + (err.response?.data?.message || err.message || "Server Error"));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded font-bold hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;