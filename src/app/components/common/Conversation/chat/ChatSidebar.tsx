import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createInternalConversation,
  getAllInternalConversations,
  removeInternalConversationById,
} from "@/app/services/internal-converstion.services";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import type { CreateInternalConversationPayload } from "@/app/types/internal-conversation.types";
import {
  ChatSidebarCreateForm,
  ChatSidebarDeleteBanner,
  ChatSidebarFilters,
  ChatSidebarHeader,
  ChatSidebarList,
} from "@/app/components/common/Conversation/chat/chat-sidebar/";

const ChatSidebar = () => {
  const {
    setConversations,
    selectedConversationId,
    setSelectedConversationId,
    addConversation,
    removeConversation: removeConversationFromStore,
  } = useInternalConversationStore();
  const conversations = useInternalConversationStore.getState().conversations;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, formState } =
    useForm<CreateInternalConversationPayload>({
      defaultValues: {
        title: "",
        type: "INTERNAL",
        status: "open",
        priority: "normal",
      },
    });

  /** Fetch all */
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await getAllInternalConversations({
        page: 1,
        limit: 100,
        includeDefault: true,
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setConversations(data);

      const firstConversation = data[0];
      if (firstConversation && !selectedConversationId) {
        setSelectedConversationId(firstConversation._id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  /** Filter + sort */
  const filteredConversations = useMemo(() => {
    if (!conversations) console.log("Conversations not found");
    let filteredConversation = [...conversations];

    if (statusFilter !== "All") {
      const normalizedStatus = statusFilter.toLowerCase();
      filteredConversation = filteredConversation.filter(
        (conv) => (conv.status || "").toLowerCase() === normalizedStatus,
      );
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase().trim();
      filteredConversation = filteredConversation.filter(
        (conv) =>
          conv.title?.toLowerCase().includes(lowerSearch) ||
          conv.lastMessage?.toLowerCase().includes(lowerSearch),
      );
    }

    return filteredConversation.sort((a, b) => {
      const updatedA = new Date(a.updatedAt || 0).getTime();
      const updatedB = new Date(b.updatedAt || 0).getTime();

      switch (sortBy) {
        case "oldest":
          return updatedA - updatedB;
        case "title-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          return (b.title || "").localeCompare(a.title || "");
        case "latest":
        default:
          return updatedB - updatedA;
      }
    });
  }, [conversations, searchTerm, statusFilter, sortBy]);

  /** Create */
  const onSubmit = async (data: CreateInternalConversationPayload) => {
    try {
      const res = await createInternalConversation(data);
      if (res.data) addConversation(res.data);
      toast.success(res.message || "Conversation created");
      setIsOpen(false);
      reset();
      fetchConversations();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create conversation");
    }
  };

  /** Delete mode toggles */
  const handleToggleDeleteMode = () => {
    setIsDeleteMode((prev) => {
      if (prev) setSelectedForDeletion([]);
      if (!prev) setIsOpen(false);
      return !prev;
    });
  };

  const toggleSelectConversation = (id: string) => {
    setSelectedForDeletion((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id],
    );
  };

  /** Delete selected */
  const handleDeleteSelected = async () => {
    if (!selectedForDeletion.length) return;
    setIsDeleting(true);

    try {
      const results = await Promise.all(
        selectedForDeletion.map((id) =>
          removeInternalConversationById(id)
            .then(() => {
              removeConversationFromStore(id);
              return { success: true };
            })
            .catch(() => ({ success: false })),
        ),
      );

      const deleted = results.filter((r) => r.success).length;
      if (deleted)
        toast.success(`${deleted} conversation(s) deleted successfully`);
      else toast.error("No conversations deleted");

      setSelectedForDeletion([]);
      setIsDeleteMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Error during deletion");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRefresh = () => {
    fetchConversations();
    toast.success("Conversations refreshed");
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <aside className="w-full h-full flex flex-col overflow-y-auto">
      <ChatSidebarHeader
        isOpen={isOpen}
        isDeleteMode={isDeleteMode}
        loading={loading}
        isDeleting={isDeleting}
        onRefresh={handleRefresh}
        onToggleDeleteMode={handleToggleDeleteMode}
        onToggleForm={() => setIsOpen((p) => !p)}
      />

      {isDeleteMode && (
        <ChatSidebarDeleteBanner
          selectedCount={selectedForDeletion.length}
          isDeleting={isDeleting}
          onDelete={handleDeleteSelected}
        />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto">
        {isOpen ? (
          <ChatSidebarCreateForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isSubmitting={formState.isSubmitting}
          />
        ) : (
          <>
            <ChatSidebarFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              total={conversations.length}
              filtered={filteredConversations.length}
            />
            <ChatSidebarList
              conversations={filteredConversations}
              selectedConversationId={selectedConversationId}
              setSelectedConversationId={setSelectedConversationId}
              isDeleteMode={isDeleteMode}
              toggleSelectConversation={toggleSelectConversation}
              selectedForDeletion={selectedForDeletion}
              loading={loading}
              searchTerm={searchTerm}
            />
          </>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
