import axios from "axios";

// Use import.meta.env for Vite, or process.env for CRA/Next.js
const baseURL =
  (import.meta.env && import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:5000") + "/api";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
