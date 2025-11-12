import { Info } from "lucide-react";

const ChatHeader = ({ conversation, members, onToggleDetails }: any) => (
  <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-white">
    <div>
      <h2 className="text-lg font-semibold text-grey">
        {conversation?.title || "Untitled Conversation"}
      </h2>
      <p className="text-sm text-grey-medium">{members?.length || 0} members</p>
    </div>
    <button
      onClick={onToggleDetails}
      className="p-2 hover:bg-grey-light rounded-lg transition-colors"
    >
      <Info size={20} className="text-grey-medium" />
    </button>
  </div>
);

export default ChatHeader;
