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
  baseURL:
    import.meta.env.VITE_API_URL_TEST ||
    ("http://localhost:3000/api/v1" as string),
  withCredentials: true, // ✅ ensures refresh cookie / csrf cookie are sent
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// REQUEST INTERCEPTOR
// Adds Authorization + CSRF headers when available
// ---------------------------------------------------------------------------
let isCooldown = false;
let cooldownTimeout: ReturnType<typeof setTimeout> | null = null;

const setCooldown = (seconds: number) => {
  isCooldown = true;
  if (cooldownTimeout) clearTimeout(cooldownTimeout);
  cooldownTimeout = setTimeout(() => {
    isCooldown = false;
  }, seconds * 1000);
};

api.interceptors.request.use(async (config) => {
  // ⏳ Block requests if in cooldown
  if (isCooldown) {
    toast.error("You are temporarily rate-limited. Please wait.");
    return Promise.reject(new Error("Rate-limited"));
  }

  try {
    const mod = await import("@/app/store/auth.store");
    const { accessToken, csrfToken } = mod.useAuthStore.getState();

    config.headers = config.headers || {};

    // ✅ Access token
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // ✅ CSRF token: Prefer store, fallback to cookie
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    } else {
      const cookieMatch = document.cookie.match(/csrf_token=([^;]+)/);
      if (cookieMatch) {
        config.headers["X-CSRF-Token"] = cookieMatch[1];
      }
    }
  } catch {
    // ignore
  }
  return config;
});

// ---------------------------------------------------------------------------
// RESPONSE INTERCEPTOR (401 handling with refresh & 429 handling with cooldown)
// ---------------------------------------------------------------------------
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

type PendingRequest = {
  resolve: (value: AxiosResponse) => void;
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

    // 🔴 Handle 401 (unauthorized -> refresh logic)
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
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

    // 🔴 Handle 429 (rate-limiting)
    if (err.response?.status === 429) {
      const retryAfter = Number(err.response.headers?.["retry-after"]) || 5;
      toast.error(
        `Too many requests. Please wait ${retryAfter} seconds before trying again.`,
      );
      setCooldown(retryAfter);
    }

    return Promise.reject(err);
  },
);

export default api;
