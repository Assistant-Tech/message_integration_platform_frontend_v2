import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import {
  AddCategory,
  CategoryTable,
} from "@/app/features/dashboard/admin/component/";
import { Category } from "@/app/types/product.types";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "@/app/features/dashboard/admin/component/ui/Data-toolbar";
import {
  fetchCategories,
  deleteCategoryById,
} from "@/app/services/category.services";

const ProductCategory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCategories();

      // Handle the response structure: response could be the data array or wrapped in data property
      const dataArray = Array.isArray(response)
        ? response
        : response?.data || [];

      // Transform API data to match Category interface
      const transformedData: Category[] = dataArray.map((item: any) => ({
        id: item.id,
        name: item.title,
        products: item._count?.children || 0,
        visibility: true, // Default to true since API doesn't return this
        action: "",
      }));

      setCategoryData(transformedData);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAdded = () => {
    loadCategories();
  };

  // const handleCategoryDelete = async (categoryId: string) => {
  //   try {
  //     await deleteCategoryById(categoryId);
  //     // Reload categories after deletion
  //     await loadCategories();
  //   } catch (err) {
  //     console.error("Failed to delete category:", err);
  //     setError("Failed to delete category. Please try again.");
  //   }
  // };

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Products: Low to High", value: "products-asc" },
    { label: "Products: High to Low", value: "products-desc" },
  ];

  // Filter options
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
      case "oldest":
        temp = temp.reverse();
        break;
      case "products-asc":
        temp = temp.sort((a, b) => a.products - b.products);
        break;
      case "products-desc":
        temp = temp.sort((a, b) => b.products - a.products);
        break;
      // case "newest": do nothing
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
          onSave={handleCategoryAdded}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading categories...</div>
        </div>
      ) : (
        /* Table */
        <CategoryTable data={filteredData} />
      )}
    </div>
  );
};

export default ProductCategory;
