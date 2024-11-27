import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", 
});

export const fetchUsers = () => api.get("/users");
export const addUser = (user) => api.post("/users", user);
export const fetchRoles = () => api.get("/roles");
export const addRole = (role) => api.post("/roles", role);
