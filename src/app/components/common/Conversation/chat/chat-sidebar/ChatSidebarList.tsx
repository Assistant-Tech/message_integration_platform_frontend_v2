import { Loader2, CheckSquare, Square } from "lucide-react";
import type { InternalConversation } from "@/app/types/internal-conversation.types";

interface Props {
  conversations: InternalConversation[];
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string) => void;
  isDeleteMode: boolean;
  toggleSelectConversation: (id: string) => void;
  selectedForDeletion: string[];
  loading: boolean;
  searchTerm: string;
}

const ChatSidebarList = ({
  conversations,
  selectedConversationId,
  setSelectedConversationId,
  isDeleteMode,
  toggleSelectConversation,
  selectedForDeletion,
  loading,
  searchTerm,
}: Props) => {
  if (loading && !conversations.length)
    return (
      <div className="flex items-center justify-center py-8 text-grey-medium">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        Loading...
      </div>
    );

  if (conversations.length === 0)
    return (
      <div className="text-center py-8">
        <p className="text-grey-medium">
          {searchTerm ? "No matching conversations" : "No conversations found"}
        </p>
        {searchTerm && (
          <button
            onClick={() => location.reload()}
            className="text-primary text-sm mt-2 hover:underline"
          >
            Clear search
          </button>
        )}
      </div>
    );

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-2 text-grey-medium text-xs">
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
          Updating...
        </div>
      )}

      <ul className="px-4 space-y-2 pb-4">
        {conversations.map((chat) => {
          const isSelected = selectedForDeletion.includes(chat._id);

          return (
            <li
              key={chat._id || `${chat.title}-${Math.random()}`}
              onClick={() =>
                isDeleteMode
                  ? toggleSelectConversation(chat._id)
                  : setSelectedConversationId(chat._id)
              }
              className={`flex items-start gap-3 px-3 py-2 border-b border-grey-light cursor-pointer transition-colors
                ${selectedConversationId === chat._id && !isDeleteMode ? "bg-primary-light rounded-lg" : ""}
                ${isDeleteMode && isSelected ? "bg-red-100/50 rounded-lg" : ""}
                hover:bg-primary-light`}
            >
              {isDeleteMode && (
                <div
                  className="flex-shrink-0 pt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelectConversation(chat._id);
                  }}
                >
                  {isSelected ? (
                    <CheckSquare size={20} className="text-red-500" />
                  ) : (
                    <Square size={20} className="text-grey-medium" />
                  )}
                </div>
              )}

              {!isDeleteMode && (
                <div className="flex-shrink-0">
                  {chat.avatar ? (
                    <img
                      src={chat.avatar}
                      alt={chat.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {chat.title?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between w-full min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="flex justify-start items-start gap-4">
                    <h4 className="h5-bold-16 text-grey truncate">
                      {chat.title}
                    </h4>
                    {chat.priority == "normal" ? (
                      // <h5 className="bg-primary-light px-2 rounded-full text-primary">
                      <h5 className="bg-information-light px-2 rounded-full text-information">
                        {chat.priority}
                      </h5>
                    ) : chat.priority == "high" ? (
                      <h5 className="bg-warning-light px-2 rounded-full text-warning-dark">
                        {chat.priority}
                      </h5>
                    ) : (
                      <h5 className="bg-danger-light px-2 rounded-full text-danger-dark">
                        {chat.priority}
                      </h5>
                    )}
                  </div>
                  <p className="label-semi-bold-14 text-grey-medium truncate">
                    {chat.lastMessage || "No messages yet"}
                  </p>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <span className="caption-medium-12 text-grey-medium">
                    {chat.updatedAt
                      ? new Date(chat.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatSidebarList;
