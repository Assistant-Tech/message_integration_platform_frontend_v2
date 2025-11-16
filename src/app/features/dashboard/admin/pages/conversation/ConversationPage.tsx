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
    <div className="flex h-full bg-base-white">
      <ChatLayout>
        <Suspense fallback={<div className="p-4">Loading chat...</div>}>
          <div className="w-full max-w-sm border-r border-grey-light bg-white h-full overflow-y-auto">
            <ChatSidebar />
          </div>
          <div className="flex-1 bg-white h-full overflow-hidden">
            <ChatPanel />
          </div>
        </Suspense>
      </ChatLayout>
    </div>
  );
};

export default ConversationPage;
