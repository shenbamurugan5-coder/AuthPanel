import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser, updateUser } from "../api/userApi";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Load Users Error:", err);
    }
  };

  const handleAdd = async () => {
    if (!name.trim()) return alert("Name is required");
    try {
      await addUser({ name });
      setName("");
      loadUsers();
    } catch (err) {
      alert("Failed to add user: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return alert("Name cannot be empty");
    try {
      await updateUser(id, { name: editName });
      setEditingId(null);
      loadUsers();
    } catch (err) {
      alert("Failed to update user: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      alert("Failed to delete user: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">👤 User Management</h1>

      <div className="mb-8 flex gap-3 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-6 py-2 rounded font-bold hover:bg-indigo-700 transition-colors whitespace-nowrap"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                {editingId === u.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button onClick={() => handleUpdate(u.id)} className="text-green-600 font-bold hover:text-green-800">
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-gray-600 font-bold hover:text-gray-800">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => startEdit(u)}
                        className="text-yellow-600 hover:text-yellow-900 font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-6 italic">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;