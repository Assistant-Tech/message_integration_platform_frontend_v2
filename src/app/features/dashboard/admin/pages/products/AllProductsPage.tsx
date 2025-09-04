import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product, Status } from "@/app/types/product.types";
import DataTableToolbar, {
  FilterConfig,
  SortOption,
} from "@/app/features/dashboard/admin/component/ui/Data-toolbar";
import { ProductTable } from "@/app/features/dashboard/admin/component";

const AllProductsPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const handleCreateNewProduct = () =>
    navigate(APP_ROUTES.ADMIN.PRODUCTS_CREATE);

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  // Filter options
  const statusOptions: FilterConfig["options"] = [
    { label: "All", value: "" },
    { label: "In Progress", value: "In Progress" },
    { label: "Success", value: "Success" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
  ];

  const filters: FilterConfig[] = [
    {
      label: "Status",
      options: statusOptions,
      value: statusFilter,
      onChange: (value) => setStatusFilter(String(value)),
    },
  ];

  // MOCK PRODUCTS
  const mockProducts: Product[] = [
    {
      name: "Classic T-Shirt",
      image: "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
      price: 25.99,
      SKU: "TSHIRT001",
      variants: "S, M, L",
      visibility: true,
      status: Status.success,
      color: "#1e90ff",
      action: "",
    },
    {
      name: "Blue Denim Jeans",
      image: "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
      price: 45.0,
      SKU: "JEANS001",
      variants: "32, 34, 36",
      visibility: true,
      status: Status.inprogress,
      color: "#2b2d42",
      action: "",
    },
    {
      name: "Stylish Sneakers",
      image: "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
      price: 60.0,
      SKU: "SHOE001",
      variants: "8, 9, 10",
      visibility: false,
      status: Status.pending,
      color: "#000000",
      action: "",
    },
    {
      name: "Comfortable Hoodie",
      image: "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
      price: 38.5,
      SKU: "HOODIE001",
      variants: "S, M, L, XL",
      visibility: true,
      status: Status.success,
      color: "#800080",
      action: "",
    },
    {
      name: "Elegant Dress",
      image: "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
      price: 79.99,
      SKU: "DRESS001",
      variants: "XS, S, M",
      visibility: true,
      status: Status.success,
      color: "#FF69B4",
      action: "",
    },
  ];

  // Filter and sort data
  const filteredData = useMemo(() => {
    let temp = [...mockProducts];

    // Search
    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter) {
      temp = temp.filter((p) => p.status === statusFilter);
    }

    // Sorting
    switch (sortBy) {
      case "oldest":
        temp = temp.reverse();
        break;
      case "price-asc":
        temp = temp.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        temp = temp.sort((a, b) => b.price - a.price);
        break;
      // case "newest": do nothing
    }

    return temp;
  }, [mockProducts, search, statusFilter, sortBy]);

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
          onClick={handleCreateNewProduct}
        />
      </div>

      {/* Toolbar */}
      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        sortOptions={sortingOptions}
        sortValue={sortBy}
        onSortChange={(v) => setSortBy(String(v))}
        filters={filters}
        onFilterClick={() => console.log("Open advanced filter modal")}
      />

      {/* Product Table */}
      <ProductTable data={filteredData} />
    </div>
  );
};

export default AllProductsPage;
