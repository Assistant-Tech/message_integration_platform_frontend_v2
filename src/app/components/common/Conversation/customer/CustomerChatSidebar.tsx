import { useMemo, useState } from "react";
import {
  ChevronDown,
  Layers3,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
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
type StatusFilter = "all" | "unassigned" | "assigned" | "resolved";
type SortOption = "latest" | "oldest" | "name-asc" | "name-desc";

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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

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

    if (statusFilter !== "all") {
      list = list.filter(
        (conversation) => conversation.status === statusFilter,
      );
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        case "name-asc":
          return a.contactName.localeCompare(b.contactName);
        case "name-desc":
          return b.contactName.localeCompare(a.contactName);
        case "latest":
        default:
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
      }
    });

    return list;
  }, [activeFilters, conversations, search, statusFilter, sortBy]);

  const toggleFilter = (filterId: QuickFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((value) => value !== filterId)
        : [...prev, filterId],
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setStatusFilter("all");
    setSortBy("latest");
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

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setIsFilterMenuOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg border border-grey-light bg-white px-3 py-2 text-sm text-grey"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </span>
            <span className="flex items-center gap-2 text-xs text-grey-medium">
              {statusFilter} • {sortBy}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isFilterMenuOpen && "rotate-180",
                )}
              />
            </span>
          </button>

          {isFilterMenuOpen && (
            <div className="mt-2 space-y-3 rounded-lg border border-grey-light bg-base-white p-3">
              <div>
                <p className="mb-2 text-xs text-grey-medium">Status</p>
                <div className="flex flex-wrap gap-2">
                  {(["all", "unassigned", "assigned", "resolved"] as const).map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setStatusFilter(option)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs capitalize",
                          statusFilter === option
                            ? "bg-primary text-base-white"
                            : "bg-primary-light text-primary",
                        )}
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-grey-medium">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-9 rounded-md border border-grey-light bg-base-white px-2 text-sm text-grey outline-none focus:border-primary"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {QUICK_FILTERS.map((filter) => {
                  const isActive = activeFilters.includes(filter.id);

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => toggleFilter(filter.id)}
                      className={cn(
                        "whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs transition-colors cursor-pointer",
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
                  className="ml-auto text-xs font-medium text-primary"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
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
