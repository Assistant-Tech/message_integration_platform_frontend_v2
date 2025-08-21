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
// RESPONSE INTERCEPTOR (401 handling with refresh & queue)
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
      if (token) {
        pending.config.headers = pending.config.headers || {};
        pending.config.headers.Authorization = `Bearer ${token}`;
      }
      api(pending.config).then(pending.resolve).catch(pending.reject);
    }
  }
};

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as RetriableAxiosRequestConfig;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Queue the request until refresh is done
        if (!isRefreshing) {
          isRefreshing = true;
          const mod = await import("@/app/store/auth.store");
          const { refreshAccessToken } = mod.useAuthStore.getState();

          refreshPromise = refreshAccessToken();
          const newToken = await refreshPromise;

          isRefreshing = false;
          processQueue(null, newToken);

          if (newToken) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }

        // If already refreshing, wait for it
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      } catch (refreshErr) {
        isRefreshing = false;
        processQueue(refreshErr, null);

        const mod = await import("@/app/store/auth.store");
        mod.useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  },
);

export default api;
