import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/app/features/dashboard/admin/component";
import ProductSearchBar from "@/app/components/common/Search/ProductSearchBar";
import { SortOption, Product } from "@/app/types/product.types";
import { useProducts } from "@/app/hooks/useProducts";
import { APP_ROUTES } from "@/app/constants/routes";
import Loading from "@/app/components/common/Loading";
import { useAuthStore } from "@/app/store/auth.store";

const AllProductsPage = () => {
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  // Fetch products with React Query
  const { data: allProduct = [], isLoading } = useProducts();

  const products = Array.isArray(allProduct) ? allProduct : [];

  // Navigate with ABSOLUTE path
  const handleCreateNewProduct = () => {
    // navigate("/asporto-quasi-vesco/admin/products/all/createProducts");
    navigate(`/${tenantSlug}/admin/${APP_ROUTES.ADMIN.PRODUCTS_CREATE}`);
  };

  // Sorting options
  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
  ];

  // Filter + Sort Data
  const filteredData = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter) {
      result = result.filter((p) => p.status === statusFilter);
    }

    switch (sortBy) {
      case "oldest":
        result.reverse();
        break;
      case "price-asc":
        result.sort((a, b) => a.variants[0].price - b.variants[0].price);
        break;
      case "price-desc":
        result.sort((a, b) => b.variants[0].price - a.variants[0].price);
        break;
    }

    return result;
  }, [products, search, statusFilter, sortBy]);

  const handleViewDetails = (product: Product) => {
    navigate(
      `/asporto-quasi-vesco/admin/products/details/${product.product_id}`,
    );
  };

  const handleEdit = (product: Product) => {
    navigate(`/asporto-quasi-vesco/admin/products/edit/${product.product_id}`);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure?")) {
      console.log("Delete:", productId);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 h-auto">
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

      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortingOptions={sortingOptions}
      />

      <ProductTable
        data={filteredData}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AllProductsPage;
