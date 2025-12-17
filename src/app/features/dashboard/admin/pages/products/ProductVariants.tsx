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

const ProductVariants = () => {
  const { data: allProduct = [], isLoading: isLoadingProducts } = useProducts();

  // Get the first product's ID, or null if no products
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
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [visibilityFilter, setVisibilityFilter] = useState("");

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
    setSelectedVariant(variant);
    setShowEditModal(true);
  };

  const handleUpdateVariant = async (
    variantId: string,
    payload: UpdateVariantPayload,
  ) => {
    try {
      await updateVariantMutation.mutateAsync({ variantId, payload });
      setShowEditModal(false);
      setSelectedVariant(null);
    } catch (error) {
      console.error("Failed to update variant:", error);
    }
  };

  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm("Are you sure you want to delete this variant?")) {
      return;
    }

    try {
      await deleteVariantMutation.mutateAsync(variantId);
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

  // Filter options
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

  // Filter and sort data
  const filteredData = useMemo(() => {
    let temp = [...variantData];

    // Search
    if (search) {
      temp = temp.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Visibility filter
    if (visibilityFilter) {
      const isVisible = visibilityFilter === "true";
      temp = temp.filter((v) => v.visibility === isVisible);
    }

    // Sorting
    switch (sortBy) {
      case "oldest":
        temp = [...temp].reverse();
        break;
      case "name-asc":
        temp = [...temp].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        temp = [...temp].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        // Already sorted by newest (assuming API returns newest first)
        break;
    }

    return temp;
  }, [variantData, search, visibilityFilter, sortBy]);

  // Loading state
  if (isLoadingProducts || isLoadingVariants) {
    return <Loading />;
  }

  // No products state
  if (!firstProductId) {
    return (
      <div className="p-6 space-y-6">
        <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-gray-500 text-lg">No products available</p>
          <p className="text-gray-400 text-sm mt-2">
            Please create a product first before adding variants
          </p>
        </div>
      </div>
    );
  }

  // console.log("🚀 ~ ProductVariants ~ filteredData:", filteredData);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col items-start gap-2">
          <Heading title="Products" align="left" className="text-base-black" />
          <h2 className="body-semi-bold-16 text-primary">Variants</h2>
        </div>

        <Button
          label="Add Variant"
          IconLeft={<Plus size={16} />}
          onClick={() => setShowVariantModal(true)}
        />
      </div>

      {/* Add Variant Modal */}
      <AddVariant
        isOpen={showVariantModal}
        onClose={() => setShowVariantModal(false)}
        onAdd={handleAddVariant}
      />

      {/* Edit Variant Modal */}
      {selectedVariant && (
        <EditVariant
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedVariant(null);
          }}
          variant={selectedVariant}
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
        onFilterClick={() => console.log("Open advanced filter modal")}
      />

      {/* Variant Table */}
      <VariantTable
        data={filteredData}
        onEdit={handleEditVariant}
        onDelete={handleDeleteVariant}
      />
    </div>
  );
};

export default ProductVariants;
