import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ProductTable } from "@/app/features/dashboard/admin/component";
import ProductSearchBar from "@/app/components/common/Search/ProductSearchBar";
import { mockProducts } from "@/app/utils/product.mock";
import { SortOption } from "@/app/types/product.types";

const AllProductsPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const handleCreateNewProduct = () => navigate("createProducts");

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
  ];

  // Filter + Sort Data
  const filteredData = useMemo(() => {
    let result = [...mockProducts];

    // Search filter
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((product) => product.status === statusFilter);
    }

    switch (sortBy) {
      case "oldest":
        result = [...result].reverse();
        break;

      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      default:
      // newest → do nothing
    }

    return result;
  }, [search, statusFilter, sortBy]);

  return (
    <div className="p-6 space-y-6 h-auto">
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
          onClick={handleCreateNewProduct}
        />
      </div>

      {/* Search + Sort */}
      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortingOptions={sortingOptions}
      />

      {/* Product Table */}
      <ProductTable data={filteredData} />
    </div>
  );
};

export default AllProductsPage;
