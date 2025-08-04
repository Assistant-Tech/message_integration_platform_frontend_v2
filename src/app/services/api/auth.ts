import axios from "axios";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export default api;
