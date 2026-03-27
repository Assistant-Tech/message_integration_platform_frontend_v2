import { create } from "zustand";
import { persist } from "zustand/middleware";
import queryClient from "@/app/utils/queryClient";
import type { User } from "@/app/types/auth.types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AuthState {
  // Persisted state
  accessToken: string | null;
  csrfToken: string | null;
  tenantSlug: string | null;
  isAuthenticated: boolean;
  requiresOnboarding: boolean;
  tokenExpiresAt: number | null;

  // Runtime state (not persisted)
  isRefreshing: boolean;
  isloading: boolean;
  user: User | null;

  // Setters
  setAccessToken: (token: string | null) => void;
  setCsrfToken: (token: string | null) => void;
  setRefreshing: (refreshing: boolean) => void;
  setTenantSlug: (slug: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setRequiresOnboarding: (requires: boolean) => void;
  setUser: (user: User | null) => void;
  setTokenExpiresAt: (expiresAt: number | null) => void;

  // Auth actions
  refreshAccessToken: () => Promise<string | null>;
  resetAuth: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ----- Initial state -----
      accessToken: null,
      csrfToken: null,
      tenantSlug: null,
      isAuthenticated: false,
      requiresOnboarding: false,
      isRefreshing: false,
      isloading: false,
      user: null,
      tokenExpiresAt: null,

      // ----- Setters -----
      setAccessToken: (accessToken) =>
        set({ accessToken, isAuthenticated: !!accessToken }),
      setCsrfToken: (csrfToken) => set({ csrfToken }),
      setRefreshing: (isRefreshing) => set({ isRefreshing }),
      setTenantSlug: (tenantSlug) => set({ tenantSlug }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setRequiresOnboarding: (requiresOnboarding) =>
        set({ requiresOnboarding }),
      setUser: (user) => set({ user }),
      setTokenExpiresAt: (tokenExpiresAt) => set({ tokenExpiresAt }),

      resetAuth: () => {
        queryClient.clear();
        localStorage.removeItem("chatblix-query-cache");

        set({
          accessToken: null,
          csrfToken: null,
          tenantSlug: null,
          isAuthenticated: false,
          requiresOnboarding: false,
          isRefreshing: false,
          isloading: false,
          user: null,
          tokenExpiresAt: null,
        });
      },

      // ----- Refresh Access Token -----
      refreshAccessToken: async () => {
        const current = get();
        if (current.isRefreshing) return current.accessToken;

        set({ isRefreshing: true });
        try {
          const { refreshAccessTokenAPI } = await import(
            "@/app/services/auth.services"
          );
          const response = await refreshAccessTokenAPI();

          if (response?.accessToken) {
            const expiresIn = 900;
            const tokenExpiresAt = Date.now() + expiresIn * 1000;

            set({
              accessToken: response.accessToken,
              csrfToken: response.csrfToken ?? current.csrfToken,
              isRefreshing: false,
              tokenExpiresAt: tokenExpiresAt,
            });
            return response.accessToken;
          }

          console.warn("Refresh token succeeded but returned no tokens?");
          get().resetAuth();
          return null;
        } catch (error: any) {
          const status = error.response?.status;
          const isCsrfError = error.response?.data?.message
            ?.toLowerCase()
            .includes("csrf");

          if (status === 401) {
            get().resetAuth();
          } else if (status === 403 && !isCsrfError) {
            get().resetAuth();
          } else if (isCsrfError) {
            console.warn(
              "CSRF mismatch detected on refresh. Preserving session for retry.",
            );
          }

          console.error("Refresh token failed:", error);
          return null;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        csrfToken: state.csrfToken,
        tenantSlug: state.tenantSlug,
        isAuthenticated: state.isAuthenticated,
        requiresOnboarding: state.requiresOnboarding,
        tokenExpiresAt: state.tokenExpiresAt,
      }),
    },
  ),
);
