import ChatPanel from "@/app/components/common/Conversation/chat/Chat-Pannel";
import ChatSidebar from "@/app/components/common/Conversation/chat/Chat-Sidebar";
import { getInternalConversationById } from "@/app/services/internal-converstion.services";
import { useChatSocket } from "@/app/Socket/useInternalChatSocket";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { useQuery } from "@tanstack/react-query";

const ConversationPage = () => {
  const { selectedConversationId } = useInternalConversationStore();

  useChatSocket();

  const { data, isLoading } = useQuery({
    queryKey: ["internal-conversation", selectedConversationId],
    queryFn: () => getInternalConversationById(selectedConversationId!),
    enabled: !!selectedConversationId,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Chat Section */}
      {selectedConversationId ? (
        <ChatPanel />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
};

export default ConversationPage;
