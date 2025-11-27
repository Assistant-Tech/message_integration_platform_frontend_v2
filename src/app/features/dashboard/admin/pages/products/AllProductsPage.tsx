import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/app/features/dashboard/admin/component";
import ProductSearchBar from "@/app/components/common/Search/ProductSearchBar";
import { SortOption, Product } from "@/app/types/product.types";
import { useProducts, useDeleteProduct } from "@/app/hooks/useProducts";
import { APP_ROUTES } from "@/app/constants/routes";
import Loading from "@/app/components/common/Loading";
import { useAuthStore } from "@/app/store/auth.store";
import { GenericDialog } from "@/app/components/common";

const AllProductsPage = () => {
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const navigate = useNavigate();

  const { data: allProduct = [], isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("");
  const [category, setCategory] = useState(""); 

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const products = Array.isArray(allProduct) ? allProduct : [];

  const handleCreateNewProduct = () => {
    navigate(`/${tenantSlug}/admin/${APP_ROUTES.ADMIN.PRODUCTS_CREATE}`);
  };

  const sortingOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
  ];

  const filteredData = useMemo(() => {
    let result = [...products];

    // SEARCH
    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY FILTER
    if (category) {
      result = result.filter((p) =>
        p.productCategory.some((pc: any) => pc.category.slug === category),
      );
    }

    // STATUS FILTER
    if (statusFilter) {
      result = result.filter((p) => p.status === statusFilter);
    }

    // SORTING
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
  }, [products, search, statusFilter, category, sortBy]);

  const handleViewDetails = (product: Product) => {
    navigate(`/${tenantSlug}/admin/products/all/details/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    navigate(`/${tenantSlug}/admin/products/edit/${product.id}`);
  };

  const handleDelete = (productId: string) => {
    setSelectedProductId(productId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;

    try {
      await deleteMutation.mutateAsync(selectedProductId);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

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

      {/* Search + Sort + Filters */}
      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortingOptions={sortingOptions}
        category={category}
        setCategory={setCategory}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table */}
      <ProductTable
        data={filteredData}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Delete Dialog */}
      <GenericDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title="Delete Product"
        maxWidth="lg"
      >
        <p className="text-grey-medium mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-lg"
            onClick={() => setOpenDeleteDialog(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 rounded-lg text-white"
            onClick={confirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </GenericDialog>
    </div>
  );
};

export default AllProductsPage;
