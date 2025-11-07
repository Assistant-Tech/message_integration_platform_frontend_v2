import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { toast } from "sonner";

import facebook from "@/app/assets/icons/fb.svg";
import instagram from "@/app/assets/icons/insta.svg";
import whatsapp from "@/app/assets/icons/whatsapp.svg";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import {
  getAllInternalConversations,
  createInternalConversation,
} from "@/app/services/internal-converstion.services";
import {
  type CreateInternalConversationPayload,
  type InternalConversation,
} from "@/app/types/internal-conversation.types";
import { MessageCirclePlus, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateInternalConversationPayload>({
    defaultValues: {
      title: "",
      type: "INTERNAL",
      status: "open",
      priority: "normal",
    },
  });

  const onSubmit = async (data: CreateInternalConversationPayload) => {
    try {
      const res = await createInternalConversation(data);
      toast.success(res.message || "Conversation created successfully");
      setIsOpen(false);
      reset();
      fetchConversations();
    } catch {
      toast.error("Failed to create conversation");
    }
  };

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchConversations(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <aside className="w-full max-w-sm border-r border-grey-light h-full overflow-y-auto">
      {/* Header */}
      <article className="flex justify-between items-center px-6 py-4 border-b border-grey-light">
        <Heading
          title="Conversation"
          align="left"
          className="text-base-black"
        />
        {isOpen ? (
          <X
            size={24}
            onClick={() => setIsOpen(false)}
            color="red"
            className="cursor-pointer"
          />
        ) : (
          <MessageCirclePlus
            size={24}
            onClick={() => setIsOpen(true)}
            color="grey"
            className="cursor-pointer"
          />
        )}
      </article>

      {isOpen ? (
        // ✅ Create Conversation Form (React Hook Form)
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-6 py-4"
        >
          <h3 className="text-lg font-semibold text-grey">
            New Internal Conversation
          </h3>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-grey-medium">
              Title
            </label>
            <Input
              placeholder="Enter conversation title"
              {...register("title", { required: true })}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-grey-medium">
              Status
            </label>
            <select
              {...register("status")}
              className="border border-grey-light text-grey-medium rounded-md p-2 w-full"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-grey-medium">
              Priority
            </label>
            <select
              {...register("priority")}
              className="border border-grey-light text-grey-medium rounded-md p-2 w-full"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white font-medium rounded-lg py-2 mt-2 hover:bg-primary-dark transition"
          >
            {isSubmitting ? "Creating..." : "Create Conversation"}
          </button>
        </form>
      ) : (
        <div className="w-full">
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
              <p className="text-center text-grey-medium">
                No conversations found
              </p>
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
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;
