import React, { useEffect, useState } from "react";
import { getDrivers, addDriver, deleteDriver, updateDriver } from "../api/driverApi";

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [formData, setFormData] = useState({ name: "", license_number: "", phone: "" });
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", license_number: "", phone: "" });

    const loadDrivers = async () => {
        try {
            const res = await getDrivers();
            setDrivers(res.data);
        } catch (err) {
            console.error("Load Drivers Error:", err);
        }
    };

    const handleAdd = async () => {
        if (!formData.name) return alert("Name is required");
        try {
            await addDriver(formData);
            setFormData({ name: "", license_number: "", phone: "" });
            loadDrivers();
        } catch (err) {
            alert("Failed to add driver");
        }
    };

    const startEdit = (driver) => {
        setEditingId(driver.id);
        setEditFormData({
            name: driver.name,
            license_number: driver.license_number || "",
            phone: driver.phone || ""
        });
    };

    const handleUpdate = async (id) => {
        try {
            await updateDriver(id, editFormData);
            setEditingId(null);
            loadDrivers();
        } catch (err) {
            alert("Failed to update driver");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteDriver(id);
            loadDrivers();
        } catch (err) {
            alert("Failed to delete driver");
        }
    };

    useEffect(() => {
        loadDrivers();
    }, []);

    return (
        <div className="bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">🚚 Driver Management</h1>

            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="border p-2 rounded w-full"
                />
                <input
                    value={formData.license_number}
                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    placeholder="License Number"
                    className="border p-2 rounded w-full"
                />
                <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleAdd}
                    className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 transition-colors"
                >
                    Add Driver
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {drivers.map((d) => (
                            <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                {editingId === d.id ? (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                className="border p-1 rounded w-full"
                                                value={editFormData.name}
                                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                className="border p-1 rounded w-full"
                                                value={editFormData.license_number}
                                                onChange={(e) => setEditFormData({ ...editFormData, license_number: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                className="border p-1 rounded w-full"
                                                value={editFormData.phone}
                                                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                            <button onClick={() => handleUpdate(d.id)} className="text-green-600 font-bold">Save</button>
                                            <button onClick={() => setEditingId(null)} className="text-gray-600 font-bold">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{d.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{d.license_number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{d.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                            <button
                                                onClick={() => startEdit(d)}
                                                className="text-yellow-600 hover:text-yellow-900 font-bold"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(d.id)}
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
                {drivers.length === 0 && (
                    <p className="text-center text-gray-500 mt-6 italic">No drivers found. Add one above!</p>
                )}
            </div>
        </div>
    );
}

export default Drivers;
