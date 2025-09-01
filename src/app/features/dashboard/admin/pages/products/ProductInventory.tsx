import { Button } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryTable } from "@/app/features/dashboard/admin/component/";
import { Inventory, Size } from "@/app/types/product.types";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "../../component/ui/Data-toolbar";

const ProductInventory = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [stockFilter, setStockFilter] = useState("");
  const navigate = useNavigate();

  const handleCreateNewOrder = () => {
    navigate(APP_ROUTES.ADMIN.ORDERS_CREATE);
  };

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
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
        { label: "Out of Stock", value: "false" },
      ],
    },
  ];

  // MOCK DATASETS
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

  // Filter and sort data
  const filteredData = useMemo(() => {
    let temp = [...inventoryMock];

    // Search
    if (search) {
      temp = temp.filter((i) =>
        i.name.productName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Stock filter
    if (stockFilter) {
      const inStock = stockFilter === "true";
      temp = temp.filter((i) => i.stock === inStock);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        temp = temp; // assume newest first
        break;
      case "oldest":
        temp = temp.reverse();
        break;
      case "price-asc":
        temp = temp.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        temp = temp.sort((a, b) => b.price - a.price);
        break;
    }

    return temp;
  }, [inventoryMock, search, stockFilter, sortBy]);

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
