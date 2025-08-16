import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getMe = () => {
  return API.get("/api/auth/me")
};

export const login = (email, password) => {
  return API.post("/api/auth/login", { email, password });
};

export const register = (email, password) => {
  return API.post("/api/auth/register", { email, password });
};

export const logout = () => {
  return API.post("/api/auth/logout")
};

export const getTasks = () => {
  return API.get("/api/tasks");
};

export const createTask = (taskData) => {
  return API.post("/api/tasks", taskData);
};

export const updateTask = (id, updateData) => {
  return API.put(`/api/tasks/${id}`, updateData);
};

export const deleteTask = (id) => {
  return API.delete(`/api/tasks/${id}`);
};