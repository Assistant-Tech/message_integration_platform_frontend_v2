import { useState } from "react";
import { Button, Input } from "@/app/components/ui/";
import { SortOption } from "@/app/types/product.types";
import { Filter, Search, X } from "lucide-react";
import Select from "@/app/components/ui/Select";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/app/services/category.services";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  sortingOptions: SortOption[];

  category: string;
  setCategory: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const ProductSearchBar = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  sortingOptions,
  category,
  setCategory,
  statusFilter,
  setStatusFilter,
}: SearchProps) => {
  const [openFilter, setOpenFilter] = useState(false);

  // Fetch categories
  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const clearFilters = () => {
    setCategory("");
    setStatusFilter("");
  };

  return (
    <div className="max-h-48 h-full w-full py-4 relative">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-16">
        {/* Search */}
        <div className="max-w-xl w-full">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft={<Search size={24} color="gray" />}
          />
        </div>

        {/* Sorting + Filter */}
        <div className="max-w-lg w-full flex gap-4 items-center text-grey-medium">
          <div className="w-full flex justify-start items-center gap-2">
            <h5 className="body-bold-16 w-24">Sort By:</h5>
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={sortingOptions}
            />
          </div>

          <Button
            label="Filter"
            variant="none"
            IconLeft={<Filter size={24} color="grey" />}
            onClick={() => setOpenFilter(true)}
            className="text-grey-medium body-bold-16 border border-grey-medium px-3 py-2"
          />
        </div>
      </div>

      {/* FILTER PANEL */}
      {openFilter && (
        <div className="absolute right-0 mt-4 bg-white shadow-xl rounded-xl p-5 w-80 z-50 border border-grey-light">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-grey">Filters</h3>
            <button onClick={() => setOpenFilter(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Category */}
          <div className="flex flex-col mb-4">
            <label className="body-bold-14 mb-1 text-grey-medium">
              Category
            </label>
            {catLoading ? (
              <div className="text-sm text-grey-medium">Loading...</div>
            ) : (
              <select
                className="border px-3 py-2 rounded-lg text-grey-medium"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col mb-4">
            <label className="body-bold-14 mb-1 text-grey-medium">Status</label>
            <select
              className="border px-3 py-2 rounded-lg text-grey-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 border rounded-lg"
              onClick={clearFilters}
            >
              Clear
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => setOpenFilter(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;
