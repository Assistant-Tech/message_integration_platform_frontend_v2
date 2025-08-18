import axios from "axios";
import { useAuthStore } from "@/app/store/auth.store";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL_TEST ||
    ("http://localhost:3000/api/v1" as string),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor → attach Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor → refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    // Check if error is due to token expiration (401) and we haven't already tried to refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call the refresh token endpoint
        const newToken = await useAuthStore.getState().refreshAccessToken();

        if (newToken) {
          // Update the Authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshErr) {
        // If refresh token fails, log the user out
        console.error("Token refresh failed:", refreshErr);
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
