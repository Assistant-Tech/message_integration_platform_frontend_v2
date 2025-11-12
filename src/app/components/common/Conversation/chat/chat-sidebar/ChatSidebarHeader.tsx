import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { MessageCirclePlus, X, RefreshCw, Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  isDeleteMode: boolean;
  loading: boolean;
  isDeleting: boolean;
  onRefresh: () => void;
  onToggleDeleteMode: () => void;
  onToggleForm: () => void;
}

const ChatSidebarHeader = ({
  isOpen,
  isDeleteMode,
  loading,
  isDeleting,
  onRefresh,
  onToggleDeleteMode,
  onToggleForm,
}: Props) => (
  <header className="flex justify-between items-center px-6 py-4 border-b border-grey-light sticky top-0 bg-white z-20">
    <Heading title="Conversation" align="left" className="text-base-black" />
    <div className="flex items-center gap-2">
      {!isOpen && !isDeleteMode && (
        <button
          onClick={onRefresh}
          disabled={loading || isDeleting}
          className="p-1 hover:bg-grey-light rounded-lg transition disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw
            size={20}
            className={`text-grey-medium ${loading ? "animate-spin" : ""}`}
          />
        </button>
      )}

      {!isOpen && (
        <button
          onClick={onToggleDeleteMode}
          disabled={loading || isDeleting}
          className="p-1 hover:bg-grey-light rounded-lg transition disabled:opacity-50"
          title={isDeleteMode ? "Cancel Deletion" : "Delete Conversations"}
        >
          <Trash2
            size={20}
            className={`text-grey-medium ${isDeleteMode ? "text-red-500" : ""}`}
          />
        </button>
      )}

      {!isDeleteMode &&
        (isOpen ? (
          <X
            size={24}
            onClick={onToggleForm}
            color="red"
            className="cursor-pointer hover:opacity-70"
          />
        ) : (
          <MessageCirclePlus
            size={24}
            onClick={onToggleForm}
            color="grey"
            className="cursor-pointer hover:opacity-70"
          />
        ))}
    </div>
  </header>
);

export default ChatSidebarHeader;
