import { Input, Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { Settings2, SlidersHorizontal } from "lucide-react";

export interface SortOption {
  label: string;
  value: string | number;
}

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterConfig {
  label: string;
  options: FilterOption[];
  value: string | number;
  onChange: (value: string | number) => void;
}

interface DataTableToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  filters?: FilterConfig[];
  onFilterClick?: () => void;
  filterLabel?: string;
  className?: string;
}

const DataTableToolbar = ({
  search = "",
  onSearchChange,
  sortOptions = [],
  sortValue,
  onSortChange,
  filters = [],
  onFilterClick,
  filterLabel = "Filter",
  className,
}: DataTableToolbarProps) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 w-full", className)}>
      {/* Search */}
      {onSearchChange && (
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {/* Sort */}
      {sortOptions.length > 0 && onSortChange && (
        <div className="flex items-center gap-2 min-w-[150px]">
          <span className="text-grey-medium font-medium">Sort by:</span>
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-grey px-3 py-2 border border-grey-light rounded-md focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filters */}
      {filters.map((filter) => (
        <div
          key={filter.label}
          className="flex items-center gap-2 min-w-[150px]"
        >
          <span className="text-grey-medium font-medium">{filter.label}:</span>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="text-grey px-3 py-2 border border-grey-light rounded-md focus:outline-none"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Filter Button */}
      {onFilterClick && (
        <Button
          variant="outlined"
          label={filterLabel}
          className="flex items-center gap-2 text-grey border-grey hover:border-primary min-w-[120px]"
          IconLeft={<Settings2 size={24} />}
          onClick={onFilterClick}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default DataTableToolbar;
