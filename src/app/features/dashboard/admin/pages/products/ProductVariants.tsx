import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import {
  AddVariant,
  VariantTable,
  EditVariant,
} from "@/app/features/dashboard/admin/component/";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "@/app/features/dashboard/admin/component/ui/Data-toolbar";
import {
  useVariant,
  useCreateVariant,
  useUpdateVariant,
  useDeleteVariant,
} from "@/app/hooks/useVariants";
import { useProducts } from "@/app/hooks/useProducts";
import { Loading } from "@/app/components/common";
import {
  CreateVariantPayload,
  UpdateVariantPayload,
  Variant,
} from "@/app/types/variants.types";
import { toast } from "sonner";
import { GenericDialog } from "@/app/components/common";

const ProductVariants = () => {
  const { data: allProduct = [], isLoading: isLoadingProducts } = useProducts();

  // First product (temporary logic)
  const firstProductId = allProduct.length > 0 ? allProduct[0].id : null;

  const { data: variantData = [], isLoading: isLoadingVariants } = useVariant(
    firstProductId || "",
  );

  const createVariantMutation = useCreateVariant(firstProductId || "");
  const updateVariantMutation = useUpdateVariant(firstProductId || "");
  const deleteVariantMutation = useDeleteVariant(firstProductId || "");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [visibilityFilter, setVisibilityFilter] = useState("");

  // Delete dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState<string | null>(null);

  // ✅ Derive selected variant safely
  const selectedVariant = useMemo<Variant | null>(() => {
    if (!selectedVariantId) return null;
    return variantData.find((v) => v.id === selectedVariantId) ?? null;
  }, [selectedVariantId, variantData]);

  const handleAddVariant = async (newVariant: CreateVariantPayload) => {
    if (!firstProductId) {
      toast.error("No product selected");
      return;
    }

    try {
      await createVariantMutation.mutateAsync(newVariant);
      setShowVariantModal(false);
    } catch (error) {
      console.error("Failed to create variant:", error);
    }
  };

  const handleEditVariant = (variant: Variant) => {
    setSelectedVariantId(variant.id);
    setShowEditModal(true);
  };

  const handleUpdateVariant = async (
    variantId: string,
    payload: UpdateVariantPayload,
  ) => {
    try {
      await updateVariantMutation.mutateAsync({ variantId, payload });
      setShowEditModal(false);
      setSelectedVariantId(null);
    } catch (error) {
      console.error("Failed to update variant:", error);
    }
  };

  const handleDeleteVariant = (variantId: string) => {
    setVariantToDelete(variantId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!variantToDelete) return;

    try {
      await deleteVariantMutation.mutateAsync(variantToDelete);
      setOpenDeleteDialog(false);
      setVariantToDelete(null);
    } catch (error) {
      console.error("Failed to delete variant:", error);
    }
  };

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Name A-Z", value: "name-asc" },
    { label: "Name Z-A", value: "name-desc" },
  ];

  // Filters
  const filters: FilterConfig[] = [
    {
      label: "Visibility",
      value: visibilityFilter,
      onChange: (value: string | number) => setVisibilityFilter(String(value)),
      options: [
        { label: "All", value: "" },
        { label: "Visible", value: "true" },
        { label: "Hidden", value: "false" },
      ],
    },
  ];

  // Filter + sort
  const filteredData = useMemo(() => {
    let temp = [...variantData];

    if (search) {
      temp = temp.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (visibilityFilter) {
      const isVisible = visibilityFilter === "true";
      temp = temp.filter((v) => v.visibility === isVisible);
    }

    switch (sortBy) {
      case "oldest":
        return [...temp].reverse();
      case "name-asc":
        return [...temp].sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return [...temp].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return temp;
    }
  }, [variantData, search, visibilityFilter, sortBy]);

  // Loading
  if (isLoadingProducts || isLoadingVariants) {
    return <Loading />;
  }

  // No products
  if (!firstProductId) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-lg">No products available</p>
        <p className="text-gray-400 text-sm mt-2">
          Please create a product first before adding variants
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Heading title="Products" align="left" />
          <h2 className="body-semi-bold-16 text-primary">Variants</h2>
        </div>

        <Button
          label="Add Variant"
          IconLeft={<Plus size={16} />}
          onClick={() => setShowVariantModal(true)}
        />
      </div>

      {/* Add Variant */}
      <AddVariant
        isOpen={showVariantModal}
        onClose={() => setShowVariantModal(false)}
        onAdd={handleAddVariant}
      />

      {/* Edit Variant */}
      {selectedVariant && (
        <EditVariant
          isOpen={showEditModal}
          variant={selectedVariant}
          onClose={() => {
            setShowEditModal(false);
            setSelectedVariantId(null);
          }}
          onUpdate={handleUpdateVariant}
        />
      )}

      {/* Toolbar */}
      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        sortOptions={sortingOptions}
        sortValue={sortBy}
        onSortChange={setSortBy}
        filters={filters}
      />

      {/* Table */}
      <VariantTable
        data={filteredData}
        onEdit={handleEditVariant}
        onDelete={handleDeleteVariant}
      />

      {/* Delete Dialog */}
      <GenericDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title="Delete Variant"
        maxWidth="lg"
      >
        <p className="text-grey-medium mb-6">
          Are you sure you want to delete this variant? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-lg"
            onClick={() => setOpenDeleteDialog(false)}
            disabled={deleteVariantMutation.isPending}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 rounded-lg text-white"
            onClick={confirmDelete}
            disabled={deleteVariantMutation.isPending}
          >
            {deleteVariantMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </GenericDialog>
    </div>
  );
};

export default ProductVariants;
