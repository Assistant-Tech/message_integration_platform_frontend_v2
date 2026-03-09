import { Suspense, lazy } from "react";
import ChatLayout from "@/app/components/layout/ChatLayout";
import { useChatSocket } from "@/app/socket/useInternalChatSocket";

const ChatPanel = lazy(
  () => import("@/app/components/common/Conversation/chat/ChatPanel"),
);
const ChatSidebar = lazy(
  () => import("@/app/components/common/Conversation/chat/ChatSidebar"),
);

const ConversationPage = () => {
  useChatSocket();

  return (
    <div className="flex h-full">
      <ChatLayout>
        <Suspense fallback={<div className="p-4">Loading chat...</div>}>
          <div className="flex h-full w-full overflow-hidden">
            <div className="h-full w-full max-w-sm overflow-y-auto border-r border-grey-light bg-base-white/90">
              <ChatSidebar />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden bg-base-white">
              <ChatPanel />
            </div>
          </div>
        </Suspense>
      </ChatLayout>
    </div>
  );
};

export default ConversationPage;
