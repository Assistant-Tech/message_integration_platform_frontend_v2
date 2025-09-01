import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import {
  AddCategory,
  CategoryTable,
} from "@/app/features/dashboard/admin/component/";
import { Category } from "@/app/types/product.types";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "@/app/features/dashboard/admin/component/ui/Data-toolbar";

const ProductCategory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const [categoryData, setCategoryData] = useState<Category[]>([
    { name: "Classic T-Shirt", products: 25, visibility: true, action: "" },
    { name: "Blue Denim", products: 4, visibility: false, action: "" },
  ]);

  const handleCategorySave = (newCategories: string[]) => {
    const updated = newCategories.map((cat) => {
      const existing = categoryData.find((c) => c.name === cat);
      return (
        existing || { name: cat, products: 0, visibility: true, action: "" }
      );
    });
    setCategoryData(updated);
  };

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Products: Low to High", value: "products-asc" },
    { label: "Products: High to Low", value: "products-desc" },
  ];

  // Filter options (example: visibility)
  const filters: FilterConfig[] = [
    {
      label: "Visibility",
      value: statusFilter,
      onChange: (value) => setStatusFilter(String(value)),
      options: [
        { label: "All", value: "" },
        { label: "Visible", value: "true" },
        { label: "Hidden", value: "false" },
      ],
    },
  ];

  // Filter and sort data
  const filteredData = useMemo(() => {
    let temp = [...categoryData];

    // Search
    if (search) {
      temp = temp.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter) {
      const isVisible = statusFilter === "true";
      temp = temp.filter((c) => c.visibility === isVisible);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        temp = temp; // assume newest first
        break;
      case "oldest":
        temp = temp.reverse();
        break;
      case "products-asc":
        temp = temp.sort((a, b) => a.products - b.products);
        break;
      case "products-desc":
        temp = temp.sort((a, b) => b.products - a.products);
        break;
    }

    return temp;
  }, [categoryData, search, statusFilter, sortBy]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col items-start gap-2">
          <Heading title="Products" align="left" className="text-base-black" />
          <h2 className="body-semi-bold-16 text-primary">Category</h2>
        </div>

        <Button
          label="Add Category"
          IconLeft={<Plus size={16} />}
          onClick={() => setShowCategoryModal(true)}
        />

        <AddCategory
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onSave={handleCategorySave}
        />
      </div>

      {/* Toolbar */}
      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        sortOptions={sortingOptions}
        sortValue={sortBy}
        onSortChange={setSortBy}
        filters={filters}
        onFilterClick={() => console.log("Open advanced filter modal")}
      />

      {/* Table */}
      <CategoryTable data={filteredData} />
    </div>
  );
};

export default ProductCategory;
