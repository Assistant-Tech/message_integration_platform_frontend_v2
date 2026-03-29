import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "sonner";

interface RetriableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_TEST,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
    // "Allow-access-control-origin": "true",
  },
});

// For Image purposes
export const API_BASE_URL = api.defaults.baseURL;

// ---------------------------------------------------------------------------
// REQUEST INTERCEPTOR
// Adds Authorization, CSRF, and Idempotency headers
// ---------------------------------------------------------------------------
let isCooldown = false;
let cooldownTimeout: ReturnType<typeof setTimeout> | null = null;

const setCooldown = (seconds: number) => {
  isCooldown = true;
  if (cooldownTimeout) clearTimeout(cooldownTimeout);
  cooldownTimeout = setTimeout(() => (isCooldown = false), seconds * 1000);
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  if (isCooldown) {
    toast.error("You are temporarily rate-limited. Please wait.");
    return Promise.reject(new Error("Rate-limited"));
  }

  try {
    const { useAuthStore } = await import("@/app/store/auth.store");
    const { accessToken, csrfToken } = useAuthStore.getState();

    config.headers = config.headers ?? {};

    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Always send CSRF token — backend validates it on all mutating + refresh requests
    // Prioritize cookie value as it's the source of truth if rotated by backend
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  } catch {
    // ignore store import errors
  }

  return config;
});

// ---------------------------------------------------------------------------
// RESPONSE INTERCEPTOR (401 handling with refresh & 429 handling with cooldown)
// ---------------------------------------------------------------------------
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
const failedQueue: {
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: unknown) => void;
  config: RetriableAxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  while (failedQueue.length > 0) {
    const pending = failedQueue.shift();
    if (!pending) continue;
    if (error) pending.reject(error);
    else {
      if (token) {
        pending.config.headers = pending.config.headers || {};
        pending.config.headers.Authorization = `Bearer ${token}`;
      }
      api(pending.config).then(pending.resolve).catch(pending.reject);
    }
  }
};

// ---------------------------------------------------------------------------
// RESPONSE INTERCEPTOR
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  async (res) => {
    const newCsrfToken =
      res.headers["x-csrf-token"] || res.headers["csrf-token"];
    if (newCsrfToken) {
      const { useAuthStore } = await import("@/app/store/auth.store");
      useAuthStore.getState().setCsrfToken(newCsrfToken);
    }
    return res;
  },
  async (err: AxiosError) => {
    const originalRequest = err.config as RetriableAxiosRequestConfig;

    // 1. Handle 401 Unauthorized
    if (err.response?.status === 401 && !originalRequest._retry) {
      // If the URL contains 'onboarding', do not attempt to refresh.
      // Onboarding tokens are temporary and shouldn't trigger the standard refresh flow.
      if (originalRequest.url?.includes("/onboarding")) {
        return Promise.reject(err);
      }
      // ---------------------------

      originalRequest._retry = true;

      try {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: originalRequest });
          });
        }

        isRefreshing = true;

        const { useAuthStore } = await import("@/app/store/auth.store");
        const { refreshAccessToken } = useAuthStore.getState();

        refreshPromise = refreshAccessToken();
        const newToken = await refreshPromise;

        isRefreshing = false;
        processQueue(null, newToken);

        if (newToken) {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return api(originalRequest);
        }
      } catch (refreshErr) {
        isRefreshing = false;
        processQueue(refreshErr, null);
        return Promise.reject(refreshErr);
      }
    }

    // 2. Handle 403 CSRF error
    if (err.response?.status === 403 && !originalRequest._retry) {
      const errorData = err.response.data as any;
      if (errorData?.message?.toLowerCase().includes("csrf")) {
        originalRequest._retry = true;
        const { useAuthStore } = await import("@/app/store/auth.store");
        useAuthStore.getState().resetAuth();
        return Promise.reject(err);
      }
    }

    // 3. Handle 429 Too Many Requests
    if (err.response?.status === 429) {
      const retryAfter = Number(err.response.headers?.["retry-after"]) || 5;
      toast.error(`Too many requests. Please wait ${retryAfter}s.`);
      setCooldown(retryAfter);
    }

    return Promise.reject(err);
  },
);

export default api;
