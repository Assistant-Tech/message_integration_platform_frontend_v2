import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationType = string;

interface Notification {
  id: string;
  type: NotificationType;
  read?: boolean;
  title?: string;
  message: string;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  hasUpcomingRenewal: boolean;
  showToasts: boolean;
  setUpcomingRenewal: (value: boolean) => void;
  toggleToasts: () => void;
  setShowToasts: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      hasUpcomingRenewal: false,
      showToasts: true,

      addNotification: (n) =>
        set((state) => ({
          notifications: [n, ...state.notifications],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
          })),
        })),

      clearNotifications: () => set({ notifications: [] }),

      setUpcomingRenewal: (value) => set({ hasUpcomingRenewal: value }),
      toggleToasts: () => set((state) => ({ showToasts: !state.showToasts })),
      setShowToasts: (value) => set({ showToasts: value }),
    }),
    {
      name: "subscription_notifications",
    },
  ),
);
