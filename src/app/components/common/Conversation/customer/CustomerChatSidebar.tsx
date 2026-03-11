import { useMemo, useState } from "react";
import { Layers3, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import PlatformIcon from "@/app/components/common/Conversation/customer/PlatformIcons";
import {
  type CustomerConversation,
  type Platform,
  PLATFORM_LABELS,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import { cn } from "@/app/utils/cn";
import ConversationItem from "@/app/components/common/Conversation/customer/ConversationItem";

type TabId = "all" | Platform;

interface Props {
  conversations: CustomerConversation[];
  activeTab: TabId;
  selectedId: string | null;
  onSelect: (conv: CustomerConversation) => void;
  onHideConversation: (conversationId: string) => void;
  onRestoreHiddenChats: () => void;
  hiddenCount: number;
}

type QuickFilterId = "unread" | "priority" | "adReplies" | "followUp";

const QUICK_FILTERS: Array<{
  id: QuickFilterId;
  label: string;
  matches: (conversation: CustomerConversation) => boolean;
}> = [
  {
    id: "unread",
    label: "Unread",
    matches: (conversation) => (conversation.unreadCount ?? 0) > 0,
  },
  {
    id: "priority",
    label: "Priority",
    matches: (conversation) =>
      conversation.status === "assigned" ||
      Boolean(conversation.tags?.includes("Pending")),
  },
  {
    id: "adReplies",
    label: "Ad replies",
    matches: (conversation) => conversation.leadSource === "ads",
  },
];

const CustomerChatSidebar = ({
  conversations,
  activeTab,
  selectedId,
  onSelect,
  onHideConversation,
  onRestoreHiddenChats,
  hiddenCount,
}: Props) => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<QuickFilterId[]>([]);
  const [isManageMode, setIsManageMode] = useState(false);

  const filtered = useMemo(() => {
    let list = [...conversations];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.contactName.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q),
      );
    }

    if (activeFilters.length > 0) {
      list = list.filter((conversation) =>
        activeFilters.every((filterId) =>
          QUICK_FILTERS.find((filter) => filter.id === filterId)?.matches(
            conversation,
          ),
        ),
      );
    }

    list.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    return list;
  }, [activeFilters, conversations, search]);

  const toggleFilter = (filterId: QuickFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((value) => value !== filterId)
        : [...prev, filterId],
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-base-white-12">
      {/* ── Search ── */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-grey-light bg-primary-light/30 px-3 py-2">
            <Search className="h-4 w-4 flex-shrink-0 text-grey-medium" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-sm text-grey outline-none placeholder:text-grey-medium"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsManageMode((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
              isManageMode
                ? "border-primary bg-primary-light text-primary"
                : "border-grey-medium/40 bg-white text-grey hover:border-grey-medium hover:bg-grey-light/30",
            )}
          >
            <Layers3 className="h-4 w-4" />
            <span>{isManageMode ? "Done" : "Manage"}</span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          {QUICK_FILTERS.map((filter) => {
            const isActive = activeFilters.includes(filter.id);

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => toggleFilter(filter.id)}
                className={cn(
                  "whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm transition-colors cursor-pointer",
                  isActive
                    ? "border-primary bg-primary-light text-primary"
                    : "border-transparent bg-grey-light/60 text-grey hover:bg-grey-light",
                )}
              >
                {filter.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent bg-transparent text-grey-medium transition-colors hover:border-grey-light hover:bg-grey-light/60 hover:text-grey"
            aria-label="Clear filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {(isManageMode || hiddenCount > 0) && (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-grey-light bg-white px-3 py-2 text-xs text-grey-medium">
            <span>
              {isManageMode
                ? "Click the remove button on a chat to hide it from this list."
                : `${hiddenCount} chat${hiddenCount === 1 ? "" : "s"} hidden.`}
            </span>
            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={onRestoreHiddenChats}
                className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restore
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Conversation List ── */}
      <div className="flex-1 overflow-y-auto scrollbar-invisible ms-2">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-grey-medium">
            No conversations found
          </p>
        ) : (
          <>
            {activeTab !== "all" && (
              <div className="flex items-center gap-2 border-b border-grey-light bg-primary-light/20 px-4 py-2">
                <PlatformIcon platform={activeTab} size={18} />

                <span className="text-xs font-semibold uppercase tracking-wide text-grey-medium">
                  {PLATFORM_LABELS[activeTab]}
                </span>

                <span className="ml-auto rounded-full bg-grey-light px-2 py-0.5 text-[10px] font-semibold text-grey-medium">
                  {filtered.length}
                </span>
              </div>
            )}

            {filtered.map((conv) => (
              <ConversationItem
                key={conv._id}
                conv={conv}
                isSelected={selectedId === conv._id}
                onSelect={() => onSelect(conv)}
                isManageMode={isManageMode}
                onRemove={() => onHideConversation(conv._id)}
              />
            ))}
          </>
        )}
      </div>
    </aside>
  );
};

export default CustomerChatSidebar;
