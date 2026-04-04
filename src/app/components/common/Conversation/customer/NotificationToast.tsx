import { useEffect, useState } from "react";

interface Toast {
  id: string;
  senderName: string;
  content: string;
}

interface Props {
  activeConversationId: string | null;
}

const NotificationToast = ({ activeConversationId }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  // listen globally — you emit this from useChatSocket
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const { message, conversationId } = e.detail;
      // only notify if it's NOT the open conversation
      if (conversationId === activeConversationId) return;
      if (message.senderName === "AGENT") return;

      const toast: Toast = {
        id: `${Date.now()}`,
        senderName: message.senderName ?? "Customer",
        content: message.content?.slice(0, 60) ?? "",
      };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => dismiss(toast.id), 4000);
    };

    window.addEventListener("inbox:new-message", handler as EventListener);
    return () =>
      window.removeEventListener("inbox:new-message", handler as EventListener);
  }, [activeConversationId]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex w-72 items-start gap-3 rounded-xl bg-white p-3 shadow-lg ring-1 ring-grey-light animate-in slide-in-from-right-4"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
            {toast.senderName[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-grey">
              {toast.senderName}
            </p>
            <p className="truncate text-xs text-grey-medium">{toast.content}</p>
          </div>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="text-grey-medium hover:text-grey"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
