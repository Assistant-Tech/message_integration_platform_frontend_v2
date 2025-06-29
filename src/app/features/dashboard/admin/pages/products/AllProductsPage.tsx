import { Button, Input } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus, Settings2, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/app/features/dashboard/admin/component/";
import { Product, Status } from "@/app/types/product";

const AllProductsPage = () => {
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
  const products: Product[] = [
    {
      name: "Classic T-Shirt",
      price: 25.99,
      SKU: "TSHIRT001",
      variants: "S, M, L",
      visibility: true,
      status: Status.success,
      color: "#1e90ff",
      action: "",
    },
    {
      name: "Blue Denim",
      price: 40,
      SKU: "DENIM001",
      variants: "32, 34, 36",
      visibility: false,
      status: Status.inprogress,
      color: "#0000ff",
      action: "",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col items-start gap-2">
          <Heading title="Products" align="left" className="text-base-black" />
          <h2 className="body-semi-bold-16 text-primary">All Products</h2>
        </div>
        <Button
          label="Add New Products"
          IconLeft={<Plus size={24} />}
          variant="primary"
          onClick={handleCreateNewOrder}
        />
      </div>

      {/* Search + Sort + Filter */}
      <div className="flex items-center justify-between flex-wrap gap-4">
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
      <ProductTable data={products} />
    </div>
  );
};

export default AllProductsPage;
