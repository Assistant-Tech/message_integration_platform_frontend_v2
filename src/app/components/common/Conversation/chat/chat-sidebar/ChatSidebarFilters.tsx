import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Input } from "@/app/components/ui";

const statusFilters = ["All", "Open", "Closed"];

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  total: number;
  filtered: number;
}

const ChatSidebarFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  total,
  filtered,
}: Props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="border-b border-grey-light px-4 py-3">
        <button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md border border-grey-light bg-base-white px-3 py-2 text-sm text-grey transition-colors hover:border-primary"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </span>
          <span className="flex items-center gap-2 text-xs text-grey-medium">
            {statusFilter} • {sortBy}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {isFilterOpen && (
          <div className="mt-2 rounded-md border border-grey-light bg-base-white p-3">
            <div className="mb-3">
              <p className="mb-2 text-xs text-grey-medium">Status</p>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      statusFilter === filter
                        ? "bg-primary text-base-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-grey-medium">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 rounded-md border border-grey-light bg-base-white px-2 text-sm text-grey outline-none focus:border-primary"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <Input
          data-testid="conversation-search"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        {searchTerm && (
          <p className="mt-1 text-xs text-grey-medium">
            {filtered} of {total} conversations
          </p>
        )}
      </div>
    </>
  );
};

export default ChatSidebarFilters;
