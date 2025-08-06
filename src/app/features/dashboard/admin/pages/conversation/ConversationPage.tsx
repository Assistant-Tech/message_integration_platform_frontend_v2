import { useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { conversations } from "@/app/utils/admin/conversation";
import { ChatPannel } from "@/app/features/dashboard/admin/component/";
import { Input } from "@/app/components/ui";

import facebook from "@/app/assets/icons/fb.svg";
import instagram from "@/app/assets/icons/insta.svg";
import whatsapp from "@/app/assets/icons/whatsapp.svg";

const platformIcons: Record<string, string> = {
  facebook,
  instagram,
  whatsapp,
};

const statusFilters = ["All", "Unassigned", "Assigned", "Resolved"];

const ConversationPage = () => {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const selectedChat =
    selectedChatIndex !== null ? conversations[selectedChatIndex] : null;

  // Add filtering logic here if you plan to implement status filtering
  const filteredConversations = conversations.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-full">
      <aside className="w-full max-w-sm border-r border-grey-light h-full overflow-y-auto">
        {/* Header */}
        <article className="px-6 py-4 border-b border-grey-light">
          <Heading
            title="Conversation"
            align="left"
            className="text-base-black"
          />
        </article>

        {/* Filter Tabs */}
        <div className="w-full  flex justify-between items-center gap-3 px-4 pt-4 body-regular-16 text-grey-medium border-b-1 border-grey-light">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`pb-4 cursor-pointer ${
                statusFilter === filter
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="px-4 py-3">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Chat List */}
        <div className="px-4 space-y-2 pb-4">
          {filteredConversations.map((chat, index) => (
            <div
              key={index}
              onClick={() => setSelectedChatIndex(index)}
              className={`flex items-start gap-3 px-3 py-2 hover:bg-primary-light cursor-pointer border-b border-grey-light ${
                selectedChatIndex === index ? "bg-primary-light rounded-lg" : ""
              }`}
            >
              {/* Avatar and Platform Icon */}
              <div className="flex flex-col items-end relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-10 rounded-full"
                />
                {platformIcons[chat.platform] && (
                  <img
                    src={platformIcons[chat.platform]}
                    alt={chat.platform}
                    className="w-6 h-6 absolute bottom-0 -right-2 rounded-3xl p-px bg-white"
                  />
                )}
              </div>

              {/* Message Content */}
              <div className="flex justify-between w-full">
                <div>
                  <h4 className="body-bold-16 text-grey">{chat.name}</h4>
                  <p className="lable-semi-bold-14 text-grey-medium max-w-48 truncate">
                    {chat.message}
                  </p>
                </div>
                <div className="text-right">
                  <span className="caption-medium-12 text-grey-medium">
                    {chat.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Panel */}
      <ChatPannel chat={selectedChat || undefined} />
    </div>
  );
};

export default ConversationPage;
