import { create } from "zustand";

export type NotificationType = "EXPIRED" | "RENEWED";

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
  markAsRead: (id: String) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set((state) => ({ notifications: [n, ...state.notifications] })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
