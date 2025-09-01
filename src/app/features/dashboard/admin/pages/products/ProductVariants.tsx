import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import {
  AddVariant,
  VariantTable,
} from "@/app/features/dashboard/admin/component/";
import { Variant } from "@/app/types/product.types";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "@/app/features/dashboard/admin/component/ui/Data-toolbar";

const ProductVariants = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState("");

  const [variantData, setVariantData] = useState<Variant[]>([
    { name: "Price", visibility: true, action: "" },
    { name: "Quantity", visibility: true, action: "" },
  ]);

  const handleAddVariant = (newVariant: string) => {
    console.log("New variant added:", newVariant);
  };

  const handleSaveVariants = (variants: string[]) => {
    const updated = variants.map((v) => {
      const existing = variantData.find((item) => item.name === v);
      return existing || { name: v, visibility: true, action: "" };
    });
    setVariantData(updated);
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
        v.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Visibility filter
    if (visibilityFilter) {
      const isVisible = visibilityFilter === "true";
      temp = temp.filter((v) => v.visibility === isVisible);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        temp = temp; // assume newest first
        break;
      case "oldest":
        temp = temp.reverse();
        break;
      case "name-asc":
        temp = temp.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        temp = temp.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return temp;
  }, [variantData, search, visibilityFilter, sortBy]);

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

        <AddVariant
          isOpen={showVariantModal}
          onClose={() => setShowVariantModal(false)}
          onAdd={handleAddVariant}
          onSave={handleSaveVariants}
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

      {/* Variant Table */}
      <VariantTable data={filteredData} />
    </div>
  );
};

export default ProductVariants;
