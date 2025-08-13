import { Button, Input } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus, Settings2, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryTable } from "@/app/features/dashboard/admin/component/";
import { Inventory, Size } from "@/app/types/product.types";

const ProductInventory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  const sortingOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  const handleCreateNewOrder = () => {
    navigate(APP_ROUTES.ADMIN.ORDERS_CREATE);
  };

  // MOCK DATASETS:
  const inventoryMock: Inventory[] = [
    {
      name: {
        productImage:
          "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
        productName: "Cotton Plain T-shirt Round Neck",
        productSubName: "Nike Daily Wear",
      },
      color: "Black",
      size: Size.small,
      quantity: 2,
      price: 800,
      stock: true,
    },
    {
      name: {
        productImage:
          "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
        productName: "Sports Shoes",
      },
      color: "Black",
      size: Size.medium,
      quantity: 2,
      price: 800,
      stock: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col items-start gap-2">
          <Heading title="Products" align="left" className="text-base-black" />
          <h2 className="body-semi-bold-16 text-primary">Inventory</h2>
        </div>
        <Button
          label="Add New Products"
          IconLeft={<Plus size={24} />}
          variant="primary"
          onClick={handleCreateNewOrder}
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

        {/* Sort */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <p className="button-semi-bold-16 text-grey-medium w-24">Sort by:</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-grey px-3 py-2 border border-grey-light rounded-md body-regular-16 focus:outline-none w-full sm:w-48"
          >
            {sortingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Button */}
        <Button
          variant="outlined"
          label="Filter"
          className="flex items-center gap-2 text-grey border-grey hover:border-primary"
          IconLeft={<Settings2 size={24} />}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Product Table */}
      <InventoryTable data={inventoryMock} />
    </div>
  );
};

export default ProductInventory;
