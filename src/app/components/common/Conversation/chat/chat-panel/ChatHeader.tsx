import { FilePlusIcon, Info, UsersRoundIcon } from "lucide-react";

const ChatHeader = ({
  conversation,
  members,
  onToggleDetails,
  isMembersPanelOpen,
  isOrderInfoOpen,
}: any) => {
  // console.log("🚀 ~ ChatHeader ~ conversation:", conversation)
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-white border-b border-grey-light">
      <div className="flex items-start gap-2">
        <div>
          <h2 className="h5-bold-16 text-base-black">
            {conversation?.title || "Untitled Conversation"}
          </h2>
          <p className="text-sm text-grey-medium">
            {members?.length || 0} members
          </p>
        </div>
        {/* priority segment */}
        {/* <div className="flex justify-start items-start gap-4">
        {conversation.priority == "normal" ? (
          <h5 className="bg-information-light px-2 rounded-full text-information">
            {conversation.priority}
          </h5>
        ) : conversation.priority == "high" ? (
          <h5 className="bg-warning-light px-2 rounded-full text-warning-dark">
            {conversation.priority}
          </h5>
        ) : (
          <h5 className="bg-danger-light px-2 rounded-full text-danger-dark">
            {conversation.priority}
          </h5>
        )}
      </div> */}
      </div>
      <div className="flex justify-end items-end">
        <button
          onClick={isOrderInfoOpen}
          className="p-2 hover:bg-grey-light rounded-lg transition-colors"
        >
          <FilePlusIcon size={20} className="text-grey-medium" />
        </button>
        <button
          onClick={isMembersPanelOpen}
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
};

export default ChatHeader;
