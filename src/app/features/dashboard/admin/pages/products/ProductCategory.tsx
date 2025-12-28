import { Button, Input } from "@/app/components/ui";
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
  deleteCategoryById,
  fetchCategories,
  updateCategoryById,
} from "@/app/services/category.services";
import { GenericDialog } from "@/app/components/common";
import { toast } from "sonner";

const ProductCategory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For Edit Dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  // Fetch categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCategories("includeProducts=true");

      const dataArray = Array.isArray(response)
        ? response
        : response?.data || [];

      const transformedData: Category[] = dataArray.map((item: any) => ({
        id: item.id,
        name: item.title,
        products: item._count?.products || 0,
        visibility: true,
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

  const handleDeleteCategory = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteCategory = async () => {
    if (!selectedCategoryId) return;

    try {
      const res = await deleteCategoryById(selectedCategoryId);
      if (res.success) {
        await loadCategories();
        toast.success(res.message);
        setOpenDeleteDialog(false);
      } else {
        setError(res.message || "Failed to delete category. Please try again.");
      }
    } catch (err) {
      console.error("Failed to delete category:", err);
      setError("Failed to delete category. Please try again.");
    }
  };

  const handleEditCategory = (categoryId: string, categoryName: string) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
    setShowEditDialog(true);
  };

  const handleSaveEditCategory = async () => {
    if (editCategoryId && editCategoryName.trim()) {
      try {
        await updateCategoryById(editCategoryId, { title: editCategoryName });
        await loadCategories();
        setShowEditDialog(false);
      } catch (err) {
        console.error("Failed to update category:", err);
        setError("Failed to update category. Please try again.");
      }
    }
  };

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
        <div className="bg-red-50 border border-danger-light text-danger px-4 py-3 rounded">
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
          <div className="text-grey-medium">Loading categories...</div>
        </div>
      ) : (
        /* Table */
        <CategoryTable
          data={filteredData}
          onDelete={handleDeleteCategory}
          onEdit={handleEditCategory}
        />
      )}

      {/* Edit Category Dialog */}
      <GenericDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        title="Edit Category"
      >
        <div className="space-y-4">
          <Input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter new category name"
          />
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              variant="outlined"
              onClick={() => setShowEditDialog(false)}
            />
            <Button label="Save" onClick={handleSaveEditCategory} />
          </div>
        </div>
      </GenericDialog>

      {/* Delete Category Dialog */}
      <GenericDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title="Delete Category"
        maxWidth="sm"
      >
        <p className="text-grey-medium mb-6">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            variant="outlined"
            onClick={() => setOpenDeleteDialog(false)}
          />
          <Button
            label="Delete"
            variant="danger"
            onClick={confirmDeleteCategory}
          />
        </div>
      </GenericDialog>
    </div>
  );
};

export default ProductCategory;
