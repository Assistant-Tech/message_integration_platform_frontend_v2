import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/app/services/api/axios";
import { User } from "@/app/types/auth.types";
import { fetchCurrentUser } from "@/app/services/auth.services";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  csrfToken: string | null;
  onboardingToken: string | null;
  requiresOnboarding: boolean;
  isVerified: boolean;
  isloading: boolean;
  isRefreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ message: string; email: string }>;
  verifyEmail: (token: string) => Promise<{ message: string }>;
  onboarding: (data: FormData) => Promise<void>;
  login: (
    email: string,
    password: string
  ) => Promise<{ message: string; requiresOnboarding: boolean }>;
  refreshAccessToken: () => Promise<string | null>;
  fetchCurrentUserProfile: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      csrfToken: null,
      onboardingToken: null,
      requiresOnboarding: false,
      isVerified: false,
      isloading: false,
      isRefreshing: true,
      setRefreshing: (refreshing) => set({ isRefreshing: refreshing }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      signup: async (name, email, password) => {
        set({ isloading: true });
        try {
          const res = await api.post("/auth/signup", { name, email, password });
          set({
            user: res.data.user,
            requiresOnboarding: res.data.requiresOnboarding,
            isVerified: false,
          });
          return { message: res.data.message, email };
        } finally {
          set({ isloading: false });
        }
      },
      verifyEmail: async (token) => {
        set({ isloading: true });
        try {
          const res = await api.get(`/auth/verify/${token}`, {
            withCredentials: true,
          });
          set({
            isVerified: true,
            requiresOnboarding: true,
          });
          return { message: res.data.message };
        } finally {
          set({ isloading: false });
        }
      },
      onboarding: async (data) => {
        set({ isloading: true });
        try {
          const res = await api.post("/auth/onboarding", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          set({
            user: res.data.user,
            requiresOnboarding: false,
          });
          return res.data;
        } finally {
          set({ isloading: false });
        }
      },
      login: async (email, password) => {
        set({ isloading: true });
        try {
          const res = await api.post("/auth/login", { email, password });
          const { user, accessToken, requiresOnboarding, csrfToken } = res.data;
          set({ user, accessToken, requiresOnboarding, csrfToken });
          return {
            message: res.data.message || "Login successful!",
            requiresOnboarding,
          };
        } finally {
          set({ isloading: false });
        }
      },
      refreshAccessToken: async () => {
        try {
          const res = await api.get("/auth/refresh", {
            headers: {
              "X-CSRF-Token": get().csrfToken,
            },
          });
          const { accessToken } = res.data;
          set({ accessToken });
          return accessToken;
        } catch {
          return null;
        }
      },
      fetchCurrentUserProfile: async () => {
        set({ isloading: true });
        try {
          const res = await fetchCurrentUser();
          set({ user: res.data });
        } finally {
          set({ isloading: false });
        }
      },
      logout: async () => {
        set({ isloading: true });
        try {
          await api.post("/auth/logout", {}).catch(() => {
            console.log("Logout Error");
          });
          set({
            user: null,
            accessToken: null,
            requiresOnboarding: false,
            onboardingToken: null,
            isVerified: false,
          });
        } finally {
          set({ isloading: false });
        }
      },
    }),
    {
      name: "auth-csrf",
      partialize: (state) => ({ csrfToken: state.csrfToken }),
    }
  )
);
