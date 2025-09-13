import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/types/auth.types";
import {
  fetchCurrentUser,
  signup,
  verifyEmail,
  onboarding,
  login,
  refreshAccessTokenAPI,
  logout,
} from "@/app/services/auth.services";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  csrfToken: string | null;
  onboardingToken: string | null;
  requiresOnboarding: boolean;
  tenantSlug: string | null;
  setTenantSlug: (slug: string) => void;
  isAuthenticated: boolean;
  isVerified: boolean;
  isloading: boolean;
  isRefreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  signup: (
    name: string,
    email: string,
    password: string,
    invitationToken?: string,
  ) => Promise<{ message: string; email: string }>;
  verifyEmail: (token: string) => Promise<{ message: string }>;
  onboarding: (data: FormData) => Promise<{ slug: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{
    message: string;
    requiresOnboarding: boolean;
    tenantSlug: string;
  }>;
  refreshAccessToken: () => Promise<string | null>;
  fetchCurrentUserProfile: () => Promise<void>;
  logout: () => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      csrfToken: null,
      onboardingToken: null,
      requiresOnboarding: false,
      tenantSlug: null,
      setTenantSlug: (slug) => set({ tenantSlug: slug }),
      isVerified: false,
      isloading: false,
      isRefreshing: false,
      isAuthenticated: false,
      setRefreshing: (refreshing) => set({ isRefreshing: refreshing }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      resetAuth: () => {
        set({
          user: null,
          accessToken: null,
          csrfToken: null,
          onboardingToken: null,
          requiresOnboarding: false,
          isVerified: false,
          isAuthenticated: false,
        });
      },
      signup: async (name, email, password, invitationToken?: string) => {
        set({ isloading: true });
        try {
          const res = await signup(name, email, password, invitationToken);
          set({
            user: res.user,
            requiresOnboarding: res.requiresOnboarding,
            isVerified: false,
          });
          return { message: res.message, email };
        } finally {
          set({ isloading: false });
        }
      },
      verifyEmail: async (token) => {
        set({ isloading: true });
        try {
          const res = await verifyEmail(token);
          set({
            isVerified: true,
            requiresOnboarding: true,
          });
          return { message: res.message };
        } finally {
          set({ isloading: false });
        }
      },
      onboarding: async (data) => {
        set({ isloading: true });
        try {
          const res = await onboarding(data);
          const onboardingData = res.data || {};
          set({ requiresOnboarding: false });
          // Refresh user so tenant appears on the profile
          await get().fetchCurrentUserProfile();
          // Prefer store user’s tenant slug; fall back to API's onboarding slug
          const slug = get().user?.tenant?.slug ?? onboardingData.slug ?? "";
          return { slug };
        } finally {
          set({ isloading: false });
        }
      },
      login: async (email, password) => {
        set({ isloading: true });
        try {
          const res = await login(email, password);
          const { accessToken, requiresOnboarding, csrfToken, tenantSlug } =
            res.data;

          // Update auth state
          set({
            accessToken,
            requiresOnboarding,
            csrfToken,
            isAuthenticated: true,
            tenantSlug,
          });

          await get().fetchCurrentUserProfile();

          if (!tenantSlug) {
            console.warn("⚠️ No tenantSlug found after login");
          }

          return {
            message: res.message || "Login successful!",
            requiresOnboarding,
            tenantSlug,
          };
        } finally {
          set({ isloading: false });
        }
      },

      refreshAccessToken: async () => {
        try {
          set({ isRefreshing: true });
          const accessToken = await refreshAccessTokenAPI();
          set({
            accessToken,
            isRefreshing: false,
            isAuthenticated: !!accessToken,
          });
          // console.log("🚀 ~ accessToken:", accessToken);
          return accessToken;
        } catch {
          set({
            accessToken: null,
            isAuthenticated: false,
            isRefreshing: false,
          });
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
          await logout();
        } catch (error) {
          console.error("Logout failed:", error);
          throw error;
        } finally {
          get().resetAuth();
          set({ isloading: false });
        }
      },
    }),
    {
      name: "auth-csrf",
      partialize: (state) => ({
        csrfToken: state.csrfToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
