import { useMemo, useState } from "react";
import {
  ChevronDown,
  Divide,
  Pin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/app/utils/cn";
import {
  type Inbox,
  SortOption,
  StatusFilter,
  QuickFilterId,
  TabId,
} from "@/app/types/inbox.types";
import ConversationItem from "@/app/components/common/Conversation/chat/ConversationItem";
import { ChannelType } from "@/app/types/common.types";
import {
  CHANNEL_LABELS,
  QUICK_FILTERS,
} from "@/app/components/common/Conversation/panel/helpers.ts";
interface Props {
  conversations: Inbox[];
  activeTab: TabId;
  selectedId: string | null;
  onSelect: (inbox: Inbox) => void;
  onHideConversation: (id: string) => void;
}

const ChatSidebar = ({
  conversations,
  activeTab,
  selectedId,
  onSelect,
  onHideConversation,
}: Props) => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<QuickFilterId[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [openId, setOpenId] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  const togglePin = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...conversations];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.contact?.name ?? "").toLowerCase().includes(q) ||
          c.lastMessageContent.toLowerCase().includes(q),
      );
    }

    if (activeFilters.length > 0) {
      list = list.filter((inbox) =>
        activeFilters.every((filterId) =>
          QUICK_FILTERS.find((f) => f.id === filterId)?.matches(inbox),
        ),
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((c) => c.status === statusFilter);
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.lastMessageAt).getTime() -
            new Date(b.lastMessageAt).getTime()
          );
        case "name-asc":
          return (a.contact?.name ?? a.title).localeCompare(
            b.contact?.name ?? b.title,
          );
        case "name-desc":
          return (b.contact?.name ?? b.title).localeCompare(
            a.contact?.name ?? a.title,
          );
        case "latest":
        default:
          return (
            new Date(b.lastMessageAt).getTime() -
            new Date(a.lastMessageAt).getTime()
          );
      }
    });

    return list;
  }, [activeFilters, conversations, search, statusFilter, sortBy]);

  const pinned = filtered.filter((c) => pinnedIds.has(c.id));
  const unpinned = filtered.filter((c) => !pinnedIds.has(c.id));

  const toggleFilter = (filterId: QuickFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
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
      {/* Search + Manage */}
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
        </div>

        {/* Filter toggle */}
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
                  {(["all", "OPEN", "CLOSED"] as const).map((option) => (
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
                      {option.toLowerCase()}
                    </button>
                  ))}
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
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scrollbar-invisible ms-2">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-grey-medium">
            No conversations found
          </p>
        ) : (
          <>
            {activeTab !== "all" && (
              <div className="flex items-center gap-2 border-b border-grey-light bg-primary-light/20 px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-grey-medium">
                  {CHANNEL_LABELS[activeTab as ChannelType]}
                </span>
                <span className="ml-auto rounded-full bg-grey-light px-2 py-0.5 text-[10px] font-semibold text-grey-medium">
                  {filtered.length}
                </span>
              </div>
            )}
            {pinned.length > 0 && (
              <>
                <div className="me-2 px-4 py-1.5 label-regular-16 text-grey-medium bg-secondary-light">
                  <Pin className="h-3.5 w-3.5 inline-block mr-1" />
                  Pinned
                </div>
                {pinned.map((inbox) => (
                  <ConversationItem
                    key={inbox.id}
                    conv={inbox}
                    isSelected={selectedId === inbox.id}
                    onSelect={() => onSelect(inbox)}
                    onRemove={() => onHideConversation(inbox.id)}
                    openId={openId}
                    setOpenId={setOpenId}
                    isPinned={true}
                    onTogglePin={() => togglePin(inbox.id)}
                  />
                ))}
                <div className="mx-4 border-b border-grey-light my-1" />
              </>
            )}
            {unpinned.map((inbox) => (
              <ConversationItem
                key={inbox.id}
                conv={inbox}
                isSelected={selectedId === inbox.id}
                onSelect={() => onSelect(inbox)}
                onRemove={() => onHideConversation(inbox.id)}
                openId={openId}
                setOpenId={setOpenId}
                isPinned={false}
                onTogglePin={() => togglePin(inbox.id)}
              />
            ))}
          </>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
