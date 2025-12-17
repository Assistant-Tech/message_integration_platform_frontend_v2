import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import {
  AddVariant,
  VariantTable,
} from "@/app/features/dashboard/admin/component/";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "@/app/features/dashboard/admin/component/ui/Data-toolbar";
import { useVariant } from "@/app/hooks/useVariants";
import { useProducts } from "@/app/hooks/useProducts";
import { Loading } from "@/app/components/common";
import { CreateVariantPayload } from "@/app/types/variants.types";
import { toast } from "sonner";

const ProductVariants = () => {
  const { data: allProduct = [], isLoading: isLoadingProducts } = useProducts();
  
  // Get the first product's ID, or null if no products
  const firstProductId = allProduct.length > 0 ? allProduct[0].id : null;
  
  const { 
    data: variantData = [], 
    isLoading: isLoadingVariants,
    refetch: refetchVariants 
  } = useVariant(firstProductId || "");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState("");

  const handleAddVariant = async (newVariant: CreateVariantPayload) => {
    try {
      if (!firstProductId) {
        toast.error("No product selected");
        return;
      }

      // Fix: Use the correct product ID from the first product
      const { createVariant } = await import("@/app/services/variants.services");
      const res = await createVariant(firstProductId, newVariant);
      
      console.log("🚀 ~ handleAddVariant ~ res:", res);
      toast.success("Variant created successfully");
      
      // Refetch variants after creation
      refetchVariants();
      setShowVariantModal(false);
    } catch (error) {
      console.error("Failed to create variant:", error);
      toast.error("Failed to create variant");
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
      <VariantTable data={filteredData} />
    </div>
  );
};

export default ProductVariants;