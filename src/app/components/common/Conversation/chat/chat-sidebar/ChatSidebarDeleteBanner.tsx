import { Loader2 } from "lucide-react";

interface Props {
  selectedCount: number;
  isDeleting: boolean;
  onDelete: () => void;
}

const ChatSidebarDeleteBanner = ({
  selectedCount,
  isDeleting,
  onDelete,
}: Props) => (
  <div className="flex justify-between items-center bg-red-50 p-3 border-b border-grey-light sticky top-[64px] z-10">
    <span className="text-sm font-medium text-danger">
      {selectedCount} selected
    </span>
    <button
      onClick={onDelete}
      disabled={!selectedCount || isDeleting}
      className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-1"
    >
      {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
      {isDeleting ? "Deleting..." : `Delete (${selectedCount})`}
    </button>
  </div>
);

export default ChatSidebarDeleteBanner;
