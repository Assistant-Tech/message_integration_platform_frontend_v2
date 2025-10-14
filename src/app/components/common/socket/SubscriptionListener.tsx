import { useEffect } from "react";
import {
  connectSubscriptionSocket,
  disconnectSubscriptionSocket,
} from "@/app/components/common/socket/subscriptionSocket";
import { toast } from "sonner";
import { SOCKET_EVENTS } from "@/app/components/common/socket/socketEvents";
import { useNotificationStore } from "@/app/store/notification.store";

const SubscriptionListener = () => {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    connectSubscriptionSocket();

    const handleEvent = (event: any) => {
      console.log("🚀 ~ handleEvent ~ event:", event);
      const data = event.detail;
      if (!data) return;

      const { type, data: payload } = data;
      console.log("🚀 ~ handleEvent ~ data:", data);
      let message = payload?.message || "";
      let title = payload?.title || "Subscription Notification";

      switch (type) {
        case "subscription.expired":
          toast.error(message || "Your subscription has expired!");
          break;

        case "subscription.renewed":
          toast.success(message || "Subscription renewed successfully!");
          break;

        case "subscription.upcoming_renewal":
          toast.warning(message || "Your subscription will expire soon!");
          break;

        default:
          toast.info(message || "New subscription event received.");
          break;
      }

      addNotification({
        id: crypto.randomUUID(),
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
      });
    };

    window.addEventListener(SOCKET_EVENTS.SUBSCRIPTION_EVENT, handleEvent);

    return () => {
      disconnectSubscriptionSocket();
      window.removeEventListener(SOCKET_EVENTS.SUBSCRIPTION_EVENT, handleEvent);
    };
  }, []);

  return null;
};

export default SubscriptionListener;
