import { useEffect } from "react";
import { toast } from "sonner";
import {
  connectSubscriptionSocket,
  disconnectSubscriptionSocket,
} from "@/app/components/common/socket/subscriptionSocket";
import { CUSTOM_EVENTS } from "@/app/components/common/socket/socketEvents";
import { useNotificationStore } from "@/app/store/notification.store";

const SubscriptionListener = () => {
  const { addNotification, setUpcomingRenewal, showToasts } =
    useNotificationStore();

  useEffect(() => {
    connectSubscriptionSocket();

    const handleEvent = (event: any) => {
      const data = event.detail;
      if (!data) return;

      const eventsArray = Array.isArray(data) ? data : [data];
      console.log("🚀 ~ handleEvent ~ eventsArray:", eventsArray);

      eventsArray.forEach((eventItem) => {
        const { type, data: payload, timestamp } = eventItem;
        const message = payload?.message || "";
        const title = payload?.title || "Subscription Notification";

        // 🧠 Only show toast if toggled ON
        if (showToasts) {
          switch (type) {
            case CUSTOM_EVENTS.PAYMENT_SUCCESS:
              toast.success(message || "Payment completed successfully!");
              break;
            case CUSTOM_EVENTS.PAYMENT_FAILED:
              toast.error(message || "Payment failed. Please try again.");
              break;
            case CUSTOM_EVENTS.CANCELLED:
              toast.error(message || "Subscription has been cancelled.");
              break;
            case CUSTOM_EVENTS.SUBSCRIPTION_ACTIVATION:
              toast.success(message || "Subscription activated!");
              break;
            case CUSTOM_EVENTS.EXPIRED:
              toast.error(message || "Your subscription has expired!");
              setUpcomingRenewal(false);
              break;
            case CUSTOM_EVENTS.RENEWED:
              toast.success(message || "Subscription renewed successfully!");
              setUpcomingRenewal(false);
              break;
            case CUSTOM_EVENTS.UPCOMING_RENEWAL:
              toast.warning(message || "Your subscription will expire soon!");
              setUpcomingRenewal(true);
              break;
            case CUSTOM_EVENTS.UPGRADED:
              toast.success(message || "Your plan has been upgraded!");
              break;
            case CUSTOM_EVENTS.DOWNGRADED:
              toast.info(message || "Your plan has been downgraded.");
              break;
            case CUSTOM_EVENTS.NEW_PLAN:
              toast.info(message || "You’ve subscribed to a new plan!");
              break;
            case CUSTOM_EVENTS.CHANGE_PLAN:
              toast.info(message || "Your subscription plan has been changed.");
              break;
            default:
              toast.info(message || "New subscription event received.");
              break;
          }
        }

        // Always store notification (even if toasts are off)
        const notification = {
          id: crypto.randomUUID(),
          type,
          title,
          message,
          createdAt: timestamp || new Date().toISOString(),
        };

        addNotification(notification);
      });
    };

    window.addEventListener(CUSTOM_EVENTS.SUBSCRIPTION_EVENT, handleEvent);
    return () => {
      disconnectSubscriptionSocket();
      window.removeEventListener(CUSTOM_EVENTS.SUBSCRIPTION_EVENT, handleEvent);
    };
  }, [addNotification, setUpcomingRenewal, showToasts]);

  return null;
};

export default SubscriptionListener;
