import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const login = (email, password) =>{
    API.post("/api/auth/login", { email, password });
}

export const register = (email, password) =>{
    API.post("/api/auth/register", { email, password });
}

export const getTasks = () =>{
    API.get("/api/tasks");
}
export const createTask = (taskData) =>{
    API.post("/api/tasks", taskData);
}

export const updateTask = (id, updateData) =>{
    API.put(`/api/tasks/${id}`, updateData);
}

export const deleteTask = (id) => {
    API.delete(`/api/tasks/${id}`);
}