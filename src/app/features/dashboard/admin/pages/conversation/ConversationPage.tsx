import { ChatPannel } from "@/app/features/dashboard/admin/component/";
import ChatSidebar from "./Chat-Sidebar";
import { useInternalConversationStore } from "@/app/store/internalConversation.store";

const ConversationPage = () => {
  const { conversations, selectedConversationId } = useInternalConversationStore();
  const selectedChat = conversations.find((c) => c._id === selectedConversationId);

  return (
    <div className="flex h-full">
      <ChatSidebar />
      <ChatPannel chat={selectedChat as any} />
    </div>
  );
};

export default ConversationPage;
