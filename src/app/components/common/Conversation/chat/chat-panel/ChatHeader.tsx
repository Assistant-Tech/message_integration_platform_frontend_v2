import { Info, UsersRoundIcon } from "lucide-react";

const ChatHeader = ({ conversation, members, onToggleDetails }: any) => (
  <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-white">
    <div>
      <h2 className="h5-bold-16 text-base-black">
        {conversation?.title || "Untitled Conversation"}
      </h2>
      <p className="text-sm text-grey-medium">{members?.length || 0} members</p>
    </div>
    <div className="flex justify-end items-end">
      <button
        onClick={onToggleDetails}
        className="p-2 hover:bg-grey-light rounded-lg transition-colors"
      >
        <UsersRoundIcon size={20} className="text-grey-medium" />
      </button>
      <button
        onClick={onToggleDetails}
        className="p-2 hover:bg-grey-light rounded-lg transition-colors"
      >
        <Info size={20} className="text-grey-medium" />
      </button>
    </div>
  </div>
);

export default ChatHeader;
