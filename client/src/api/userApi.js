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

export const getUsers = () => API.get("/users");
export const addUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);