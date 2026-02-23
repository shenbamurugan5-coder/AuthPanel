import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Interceptor to add token to headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getDrivers = () => API.get("/drivers");
export const addDriver = (data) => API.post("/drivers", data);
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);
export const updateDriver = (id, data) => API.put(`/drivers/${id}`, data);
