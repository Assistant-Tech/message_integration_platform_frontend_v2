import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// NOTE: We intentionally avoid importing the auth store at the top-level to prevent
// a circular dependency (store -> api -> store). Instead we'll lazy-load it inside
// the interceptors when needed.

interface RetriableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL_TEST ||
    ("http://localhost:3000/api/v1" as string),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// REQUEST INTERCEPTOR
// Adds Authorization header when access token exists.
// ---------------------------------------------------------------------------
api.interceptors.request.use(async (config) => {
  try {
    const mod = await import("@/app/store/auth.store");
    const { accessToken } = mod.useAuthStore.getState();
    if (accessToken) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  } catch {
    // ignore
  }
  return config;
});

// ---------------------------------------------------------------------------
// RESPONSE INTERCEPTOR (401 handling & refresh token flow with queue)
// ---------------------------------------------------------------------------
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
type PendingRequest = {
  // We resolve with an AxiosResponse for the retried request
  resolve: (value: AxiosResponse) => void;
  // Reject can be unknown
  reject: (reason?: unknown) => void;
  config: RetriableAxiosRequestConfig;
};
const failedQueue: PendingRequest[] = [];

const processQueue = (error: unknown, token: string | null) => {
  while (failedQueue.length) {
    const pending = failedQueue.shift();
    if (!pending) continue;
    if (error) {
      pending.reject(error);
    } else {
      (async () => {
        if (token) {
          pending.config.headers = pending.config.headers || {};
          pending.config.headers.Authorization = `Bearer ${token}`;
        }
        try {
          const response = await api(pending.config);
          pending.resolve(response);
        } catch (err) {
          pending.reject(err);
        }
      })();
    }
  }
};

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
