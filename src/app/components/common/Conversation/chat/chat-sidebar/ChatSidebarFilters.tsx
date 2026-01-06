import { Input } from "@/app/components/ui";

const statusFilters = ["All", "Unassigned", "Assigned", "Resolved"];

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  total: number;
  filtered: number;
}

const ChatSidebarFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  total,
  filtered,
}: Props) => (
  <>
    <div className="w-full flex justify-between items-center gap-3 px-4 pt-4 border-b border-grey-light body-regular-16 text-grey-medium">
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

    <div className="px-4 py-3">
      <Input
        data-testid="conversation-search"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      {searchTerm && (
        <p className="text-xs text-grey-medium mt-1">
          {filtered} of {total} conversations
        </p>
      )}
    </div>
  </>
);

export default ChatSidebarFilters;
