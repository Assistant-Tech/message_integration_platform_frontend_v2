import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { toast } from "sonner";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import {
  getAllInternalConversations,
  createInternalConversation,
  removeInternalConversationById,
} from "@/app/services/internal-converstion.services";
import {
  type CreateInternalConversationPayload,
  type InternalConversation,
} from "@/app/types/internal-conversation.types";
import {
  MessageCirclePlus,
  X,
  Loader2,
  RefreshCw,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";

const statusFilters = ["All", "Unassigned", "Assigned", "Resolved"];

const ChatSidebar = () => {
  const {
    conversations,
    setConversations,
    selectedConversationId,
    setSelectedConversationId,
    addConversation,
    removeConversation: removeConversationFromStore,
  } = useInternalConversationStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const safeConversations = Array.isArray(conversations) ? conversations : [];

  const filteredConversations = useMemo(() => {
    let filtered = safeConversations;

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((conv) => {
        const titleMatch = conv.title?.toLowerCase().includes(lowerSearch);
        const messageMatch = conv.lastMessage
          ? conv.lastMessage.toLowerCase().includes(lowerSearch)
          : false;
        return titleMatch || messageMatch;
      });
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.updatedAt || 0).getTime();
      const dateB = new Date(b.updatedAt || 0).getTime();
      return dateB - dateA;
    });
  }, [safeConversations, searchTerm, statusFilter]);

  const fetchConversations = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) setLoading(true);
        const response = await getAllInternalConversations({
          page: 1,
          limit: 100,
          includeDefault: false,
        });
        const conversationsData = Array.isArray(response.data)
          ? response.data
          : [];
        setConversations(conversationsData);
      } catch (err) {
        console.error("Failed to load conversations:", err);
        toast.error("Failed to load conversations");
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [setConversations],
  );

  const onSubmit = async (data: CreateInternalConversationPayload) => {
    try {
      const res = await createInternalConversation(data);
      const newConversation: InternalConversation | undefined = res.data;
      if (newConversation) addConversation(newConversation);

      toast.success(res.message || "Conversation created successfully");
      setIsOpen(false);
      reset();

      fetchConversations();
    } catch (err) {
      console.error("Failed to create conversation:", err);
      toast.error("Failed to create conversation");
    }
  };

  const handleRefresh = () => {
    fetchConversations();
    toast.success("Conversations refreshed");
  };

  const toggleSelectConversation = (id: string) => {
    setSelectedForDeletion((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (!selectedForDeletion.length) return;
    setIsDeleting(true);
    const conversationIdsToDelete = [...selectedForDeletion];

    try {
      const results = await Promise.all(
        conversationIdsToDelete.map((id) =>
          removeInternalConversationById(id)
            .then(() => {
              removeConversationFromStore(id);
              return { success: true };
            })
            .catch(() => ({ success: false })),
        ),
      );

      const successfulDeletions = results.filter((r) => r.success).length;

      if (successfulDeletions > 0) {
        toast.success(
          `${successfulDeletions} conversation(s) deleted successfully.`,
        );
      } else toast.error("No conversations were successfully deleted.");

      setSelectedForDeletion([]);
      setIsDeleteMode(false);
    } catch (err) {
      console.error("Unexpected error during deletion:", err);
      toast.error("An unexpected error occurred during deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleDeleteMode = () => {
    setIsDeleteMode((prev) => {
      if (prev) setSelectedForDeletion([]);
      if (!prev) setIsOpen(false);
      return !prev;
    });
  };

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <aside className="w-full max-w-sm border-r border-grey-light h-screen flex flex-col">
      {/* Header */}
      <article className="flex justify-between items-center px-6 py-4 border-b border-grey-light sticky top-0 bg-white z-20">
        <Heading
          title="Conversation"
          align="left"
          className="text-base-black"
        />
        <div className="flex items-center gap-2">
          {!isOpen && !isDeleteMode && (
            <button
              onClick={handleRefresh}
              disabled={loading || isDeleting}
              className="p-1 hover:bg-grey-light rounded-lg transition-colors disabled:opacity-50"
              title="Refresh conversations"
            >
              <RefreshCw
                size={20}
                className={`text-grey-medium ${loading ? "animate-spin" : ""}`}
              />
            </button>
          )}
          {!isOpen && (
            <button
              onClick={handleToggleDeleteMode}
              disabled={loading || isDeleting}
              className="p-1 hover:bg-grey-light rounded-lg transition-colors disabled:opacity-50"
              title={isDeleteMode ? "Cancel deletion" : "Delete conversations"}
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
                onClick={() => setIsOpen(false)}
                color="red"
                className="cursor-pointer hover:opacity-70 transition-opacity"
              />
            ) : (
              <MessageCirclePlus
                size={24}
                onClick={() => setIsOpen(true)}
                color="grey"
                className="cursor-pointer hover:opacity-70 transition-opacity"
              />
            ))}
        </div>
      </article>

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Delete Mode Banner */}
        {isDeleteMode && (
          <div className="flex justify-between items-center bg-red-50 p-3 border-b border-grey-light sticky top-[64px] z-10">
            <span className="text-sm font-medium text-danger">
              {selectedForDeletion.length} selected
            </span>
            <button
              onClick={handleDeleteSelected}
              disabled={!selectedForDeletion.length || isDeleting}
              className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-1"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isDeleting
                ? "Deleting..."
                : `Delete (${selectedForDeletion.length})`}
            </button>
          </div>
        )}

        {isOpen ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-6 py-4"
          >
            <h3 className="text-lg font-semibold text-grey">
              New Internal Conversation
            </h3>
            <div>
              <label className="block text-sm font-medium text-grey-medium mb-1">
                Title
              </label>
              <Input
                placeholder="Enter conversation title"
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-grey-medium mb-1">
                Status
              </label>
              <select
                {...register("status")}
                className="border border-grey-light text-grey-medium rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-grey-medium mb-1">
                Priority
              </label>
              <select
                {...register("priority")}
                className="border border-grey-light text-grey-medium rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white font-medium rounded-lg py-2 mt-2 hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Conversation"}
            </button>
          </form>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Filter Tabs */}
            <div className="w-full flex justify-between items-center gap-3 px-4 pt-4 body-regular-16 text-grey-medium border-b border-grey-light">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`pb-4 cursor-pointer transition-colors ${
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
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              {searchTerm && (
                <p className="text-xs text-grey-medium mt-1">
                  {filteredConversations.length} of {safeConversations.length}{" "}
                  conversations
                </p>
              )}
            </div>

            {/* Chat List */}
            <div className="px-4 space-y-2 pb-4 flex-1">
              {loading && !safeConversations.length ? (
                <div className="flex items-center justify-center py-8 text-grey-medium">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Loading...
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-grey-medium">
                    {searchTerm
                      ? "No matching conversations"
                      : "No conversations found"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-primary text-sm mt-2 hover:underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {loading && (
                    <div className="flex items-center justify-center py-2 text-grey-medium text-xs">
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      Updating...
                    </div>
                  )}
                  {filteredConversations.map((chat: InternalConversation) => {
                    const isSelected = selectedForDeletion.includes(chat._id);
                    return (
                      <div
                        key={chat._id}
                        onClick={() =>
                          isDeleteMode
                            ? toggleSelectConversation(chat._id)
                            : setSelectedConversationId(chat._id)
                        }
                        className={`flex items-start gap-3 px-3 py-2 hover:bg-primary-light cursor-pointer border-b border-grey-light transition-colors ${
                          selectedConversationId === chat._id && !isDeleteMode
                            ? "bg-primary-light rounded-lg"
                            : ""
                        } ${isDeleteMode && isSelected ? "bg-red-100/50 rounded-lg" : ""}`}
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

                        <div
                          className={`flex justify-between w-full min-w-0 ${isDeleteMode ? "py-1" : ""}`}
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="body-bold-16 text-grey truncate">
                              {chat.title}
                            </h4>
                            <p className="label-semi-bold-14 text-grey-medium truncate">
                              {chat.lastMessage || "No messages yet"}
                            </p>
                          </div>
                          <div className="text-right ml-2 flex-shrink-0">
                            <span className="caption-medium-12 text-grey-medium">
                              {chat.updatedAt
                                ? new Date(chat.updatedAt).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" },
                                  )
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
