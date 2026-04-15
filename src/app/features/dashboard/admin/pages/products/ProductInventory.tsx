import { Button } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryTable } from "@/app/features/dashboard/admin/component/";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "../../component/ui/Data-toolbar";
import { useProducts } from "@/app/hooks/useProducts";
import { useVariant } from "@/app/hooks/useVariants";
import { Loading } from "@/app/components/common";
import { Variant } from "@/app/types/variants.types";

// Transform variant data into inventory format
interface InventoryData extends Variant {
  productName: string;
  productImage?: string;
}

const ProductInventory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [stockFilter, setStockFilter] = useState("");
  const navigate = useNavigate();

  // Fetch products and variants
  const { data: allProducts = [], isLoading: isLoadingProducts } =
    useProducts();
  const firstProductId = allProducts.length > 0 ? allProducts[0].id : null;

  const { data: variantData = [], isLoading: isLoadingVariants } = useVariant(
    firstProductId || "",
  );

  const handleCreateNewOrder = () => {
    navigate(APP_ROUTES.ADMIN.ORDERS_CREATE);
  };

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Stock: Low to High", value: "stock-asc" },
    { label: "Stock: High to Low", value: "stock-desc" },
  ];

  // Filter options
  const filters: FilterConfig[] = [
    {
      label: "Stock",
      value: stockFilter,
      onChange: (value: string | number) => setStockFilter(String(value)),
      options: [
        { label: "All", value: "" },
        { label: "In Stock", value: "true" },
        { label: "Low Stock", value: "low" },
        { label: "Out of Stock", value: "false" },
      ],
    },
  ];

  // Transform and filter data
  const inventoryData = useMemo((): InventoryData[] => {
    if (!allProducts.length || !variantData.length) return [];

    return variantData.map((variant) => {
      const product = allProducts.find((p: any) => p.id === variant.productId);
      return {
        ...variant,
        productName: product?.title || "Unknown Product",
        productImage: product?.images?.[0]?.url,
      };
    });
  }, [allProducts, variantData]);

  const filteredData = useMemo(() => {
    let temp = [...inventoryData];

    // Search
    if (search) {
      temp = temp.filter(
        (i) =>
          i.productName.toLowerCase().includes(search.toLowerCase()) ||
          i.title.toLowerCase().includes(search.toLowerCase()) ||
          i.sku?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Stock filter
    if (stockFilter) {
      if (stockFilter === "true") {
        temp = temp.filter(
          (i) => i.inventory.stock > 0 && !i.inventory.lowStock,
        );
      } else if (stockFilter === "low") {
        temp = temp.filter((i) => i.inventory.lowStock);
      } else if (stockFilter === "false") {
        temp = temp.filter((i) => i.inventory.stock === 0);
      }
    }

    // Sorting
    switch (sortBy) {
      case "oldest":
        temp = [...temp].reverse();
        break;
      case "price-asc":
        temp = [...temp].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        temp = [...temp].sort((a, b) => b.price - a.price);
        break;
      case "stock-asc":
        temp = [...temp].sort((a, b) => a.inventory.stock - b.inventory.stock);
        break;
      case "stock-desc":
        temp = [...temp].sort((a, b) => b.inventory.stock - a.inventory.stock);
        break;
      case "newest":
      default:
        // Already sorted by newest
        break;
    }

    return temp;
  }, [inventoryData, search, stockFilter, sortBy]);

  if (isLoadingProducts || isLoadingVariants) {
    return <Loading />;
  }

  if (!firstProductId || inventoryData.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-gray-500 text-lg">No inventory data available</p>
          <p className="text-gray-400 text-sm mt-2">
            Please create products and variants first
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
          <h2 className="body-semi-bold-16 text-primary">Inventory</h2>
        </div>
        <Button
          label="Add New Products"
          IconLeft={<Plus size={24} />}
          variant="primary"
          onClick={handleCreateNewOrder}
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

      {/* Inventory Table */}
      <InventoryTable data={filteredData} />
    </div>
  );
};

export default ProductInventory;
