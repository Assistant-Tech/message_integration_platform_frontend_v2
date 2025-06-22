import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "@/app/types/auth.ts";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,

        login: (user, token) => {
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        },

        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
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
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: "auth-store" },
  ),
);
