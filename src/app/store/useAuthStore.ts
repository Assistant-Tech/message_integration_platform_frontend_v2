import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "@/app/types/auth.ts";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardingCompleted: boolean;

  // Actions
  login: (user: User, token: string, isOnboardingCompleted?: boolean) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
  setOnboardingCompleted: (completed: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isOnboardingCompleted: false,

        login: (user, token, isOnboardingCompleted = false) => {
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            isOnboardingCompleted,
          });
        },

        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            isOnboardingCompleted: false,
          });
        },

        setLoading: (isLoading) => {
          set({ isLoading });
        },

        updateUser: (updatedUser) => {
          const { user } = get();
          if (user) {
            set({ user: { ...user, ...updatedUser } });
          }
        },

        setOnboardingCompleted: (completed) => {
          set({ isOnboardingCompleted: completed });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          isOnboardingCompleted: state.isOnboardingCompleted,
        }),
      },
    ),
    { name: "auth-store" },
  ),
);
