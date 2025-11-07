import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { ChatDisplay, ChatPannel, ChatSidebar } from "@/app/components/common";
import { useEffect, useState } from "react";
import { getInternalConversationById } from "@/app/services/internal-converstion.services";

const ConversationPage = () => {
  const { selectedConversationId } = useInternalConversationStore();
  const [selectedChatDetails, setSelectedChatDetails] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChatDetails = async () => {
      if (!selectedConversationId) return;
      try {
        const data = await getInternalConversationById(selectedChatDetails);
        setSelectedChatDetails(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchChatDetails;
  }, [selectedConversationId]);

  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-full">
      <ChatSidebar />
      <ChatPannel chat={selectedChatDetails} />
      <ChatDisplay />
    </div>
  );
};

export default ConversationPage;
