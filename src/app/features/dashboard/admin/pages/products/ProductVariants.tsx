import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus, Settings2, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  AddVariant,
  VariantTable,
} from "@/app/features/dashboard/admin/component/";
import { Variant } from "@/app/types/product.types";

const ProductVariants = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVariantModal, setShowVariantModal] = useState(false);

  const [variantData, setVariantData] = useState<Variant[]>([
    {
      name: "Price",
      visibility: true,
      action: "",
    },
    {
      name: "Quantity",
      visibility: true,
      action: "",
    },
  ]);

  const handleAddVariant = (newVariant: string) => {
    console.log("New variant added:", newVariant);
  };

  const handleSaveVariants = (variants: string[]) => {
    const updated = variants.map((v) => {
      const existing = variantData.find((item) => item.name === v);
      return (
        existing || {
          name: v,
          visibility: true,
          action: "",
        }
      );
    });
    setVariantData(updated);
  };

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

      {/* Search + Sort + Filter */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <p className="button-semi-bold-16 text-grey-medium w-24">Sort by:</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-grey px-3 py-2 border border-grey-light rounded-md body-regular-16 focus:outline-none w-full sm:w-48"
          >
            {[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              { label: "Price: Low to High", value: "price-asc" },
              { label: "Price: High to Low", value: "price-desc" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outlined"
          label="Filter"
          className="flex items-center gap-2 text-grey border-grey hover:border-primary"
          IconLeft={<Settings2 size={24} />}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Variant Table */}
      <VariantTable data={variantData} />
    </div>
  );
};

export default ProductVariants;
