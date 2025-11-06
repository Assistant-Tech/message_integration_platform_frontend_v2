import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { toast } from "sonner";

import facebook from "@/app/assets/icons/fb.svg";
import instagram from "@/app/assets/icons/insta.svg";
import whatsapp from "@/app/assets/icons/whatsapp.svg";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { getAllInternalConversations } from "@/app/services/internal-converstion.services";
import type { InternalConversation } from "@/app/types/internal-conversation.types";

const platformIcons: Record<string, string> = {
  facebook,
  instagram,
  whatsapp,
};

const statusFilters = ["All", "Unassigned", "Assigned", "Resolved"];

const ChatSidebar = () => {
  const {
    conversations,
    setConversations,
    selectedConversationId,
    setSelectedConversationId,
  } = useInternalConversationStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Conversations
  const fetchConversations = async (search?: string) => {
    try {
      setLoading(true);
      const response = await getAllInternalConversations({
        search: search ?? "",
        includeDefault: false,
      });
      setConversations(response.data ?? []);
    } catch (err) {
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // 🔹 Handle search (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchConversations(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
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
      <div className="w-full flex justify-between items-center gap-3 px-4 pt-4 body-regular-16 text-grey-medium border-b border-grey-light">
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
        {loading ? (
          <p className="text-center text-grey-medium">Loading...</p>
        ) : conversations.length === 0 ? (
          <p className="text-center text-grey-medium">No conversations found</p>
        ) : (
          conversations.map((chat: InternalConversation) => (
            <div
              key={chat._id}
              onClick={() => setSelectedConversationId(chat._id)}
              className={`flex items-start gap-3 px-3 py-2 hover:bg-primary-light cursor-pointer border-b border-grey-light ${
                selectedConversationId === chat._id
                  ? "bg-primary-light rounded-lg"
                  : ""
              }`}
            >
              {/* Avatar and Platform Icon */}
              <div className="flex flex-col items-end relative">
                <img
                  src={chat.avatar || "/placeholder-avatar.png"}
                  alt={chat.title}
                  className="w-12 h-10 rounded-full object-cover"
                />
                {chat.platform && platformIcons[chat.platform] && (
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
                  <h4 className="body-bold-16 text-grey">{chat.title}</h4>
                  <p className="label-semi-bold-14 text-grey-medium max-w-48 truncate">
                    {chat.lastMessage || "No messages yet"}
                  </p>
                </div>
                <div className="text-right">
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
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
export default ChatSidebar;
