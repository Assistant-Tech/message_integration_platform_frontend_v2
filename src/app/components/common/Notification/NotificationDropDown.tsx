import { useNotificationStore } from "@/app/store/notification.store";
import { Bell } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } =
    useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild> 
        <button className="relative p-2 rounded-full hover:bg-grey-light">
          <Bell className="w-5 h-5 text-grey-medium" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-danger text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={8}
        align="end"
        className="w-80 bg-white shadow-lg rounded-lg p-2"
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <p className="text-sm font-medium">Notifications</p>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="text-xs text-information hover:underline"
              >
                Mark all as read
              </button>
              <button
                onClick={clearNotifications}
                className="text-xs text-danger hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div className="text-center text-grey-medium text-sm py-4">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <DropdownMenu.Item
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`px-3 py-2 text-sm rounded cursor-pointer ${
                n.read
                  ? "text-gray-600 hover:bg-grey-light"
                  : "bg-blue-50 text-grey hover:bg-information-light"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-grey-medium">{n.message}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-information mt-1.5" />
                )}
              </div>
            </DropdownMenu.Item>
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NotificationDropdown;
