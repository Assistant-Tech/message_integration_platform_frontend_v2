import { useAuthStore } from "@/app/store/useAuthStore";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiClient = () => {
  const { token, logout } = useAuthStore.getState(); // directly access the store

  const instance = axios.create({
    baseURL,
    withCredentials: true, // support for HttpOnly cookies
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach Authorization token
  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle responses & token expiration
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        logout(); // clear auth state
        // optionally redirect to login
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
