import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus, Settings2, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  AddCategory,
  CategoryTable,
} from "@/app/features/dashboard/admin/component/";
import { Category } from "@/app/types/product.types";

const ProductCategory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [categoryData, setCategoryData] = useState<Category[]>([
    {
      name: "Classic T-Shirt",
      products: 25,
      visibility: true,
      action: "",
    },
    {
      name: "Blue Denim",
      products: 4,
      visibility: false,
      action: "",
    },
  ]);

  const handleCategorySave = (newCategories: string[]) => {
    const updated = newCategories.map((cat) => {
      // If exists, keep as is. If new, add with default values
      const existing = categoryData.find((c) => c.name === cat);
      return (
        existing || {
          name: cat,
          products: 0,
          visibility: true,
          action: "",
        }
      );
    });
    setCategoryData(updated);
  };

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

      {/* Search + Sort + Filter */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />

        <div className="flex items-center gap-3 w-96 sm:w-auto">
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

      {/* Table */}
      <CategoryTable data={categoryData} />
    </div>
  );
};

export default ProductCategory;
