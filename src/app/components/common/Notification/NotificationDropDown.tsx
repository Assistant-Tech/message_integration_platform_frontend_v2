import { useNotificationStore } from "@/app/store/notification.store";
import { useInboxFetchAllQuery } from "@/app/hooks/query/useInboxQuery";
import { formatTimestamp } from "@/app/utils/helper";
import { APP_ROUTES } from "@/app/constants/routes";
import { INBOX_LIST_PARAMS } from "@/app/constants/queryKeys";
import { Bell } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } =
    useNotificationStore();
  const { data } = useInboxFetchAllQuery(
    INBOX_LIST_PARAMS.type,
    INBOX_LIST_PARAMS.page,
    INBOX_LIST_PARAMS.limit,
  );
  const navigate = useNavigate();
  const { slug } = useParams();

  const conversations = data?.data ?? [];
  const unreadConversations = conversations.filter(
    (conversation) => conversation.unreadCount > 0,
  );
  const unreadMessageCount = unreadConversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0,
  );

  const unreadSystemCount = notifications.filter((n) => !n.read).length;
  const unreadCount = unreadSystemCount + unreadMessageCount;

  const handleOpenInbox = () => {
    if (!slug) return;
    navigate(`/app/${slug}/admin/${APP_ROUTES.ADMIN.CONVERSATION}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-grey-light bg-base-white text-grey-medium transition-colors hover:bg-primary-light hover:text-primary">
          <Bell className="w-5 h-5 text-grey-medium" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={8}
        align="end"
        className="w-80 bg-white shadow-lg rounded-lg p-2 z-50"
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

        {unreadConversations.length > 0 && (
          <div className="border-b border-grey-light px-3 py-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-grey-medium">
              Unread messages
            </p>
            <div className="space-y-1">
              {unreadConversations.slice(0, 5).map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={handleOpenInbox}
                  className="flex w-full items-start justify-between rounded-md px-2 py-2 text-left hover:bg-primary-light/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-grey">
                      {conversation.contact?.name ?? conversation.title}
                    </p>
                    <p className="truncate text-xs text-grey-medium">
                      {conversation.lastMessageContent}
                    </p>
                  </div>
                  <div className="ml-3 flex flex-shrink-0 items-center gap-2">
                    <span className="text-[10px] text-grey-medium">
                      {formatTimestamp(conversation.lastMessageAt)}
                    </span>
                    <span className="inline-flex p-2 w-5 items-center justify-center rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {conversation.unreadCount > 99
                        ? "99+"
                        : conversation.unreadCount}
                    </span>
                    <span
                      className="h-2 w-2 rounded-full bg-danger"
                      aria-label={`${conversation.unreadCount} unread messages`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notification List */}
        {notifications.length === 0 && unreadConversations.length === 0 ? (
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
