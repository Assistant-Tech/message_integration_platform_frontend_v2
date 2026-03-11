import { cn } from "@/app/utils/cn";
import type { ConversationMessage } from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import { formatMessageTime, getAvatarColour, getInitials } from "./helpers";

interface Props {
  message: ConversationMessage;
  contactName: string;
}

const CustomerChatMessageBubble = ({ message, contactName }: Props) => {
  const isAgent = message.sender === "agent";

  return (
    <div
      className={cn("flex gap-3", isAgent ? "flex-row-reverse" : "flex-row")}
    >
      {!isAgent && (
        <div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            getAvatarColour(contactName),
          )}
        >
          {getInitials(contactName)}
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] space-y-1",
          isAgent ? "items-end text-right" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words",
            isAgent
              ? "rounded-tr-sm bg-primary text-white"
              : "rounded-tl-sm bg-base-white text-grey shadow-sm ring-1 ring-grey-light",
          )}
        >
          {message.content}
        </div>
        <p className="px-1 text-[10px] text-grey-medium">
          {formatMessageTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default CustomerChatMessageBubble;
