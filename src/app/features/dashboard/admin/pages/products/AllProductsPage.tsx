import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Plus, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/app/features/dashboard/admin/component";
import ProductSearchBar from "@/app/components/common/Search/ProductSearchBar";
import { SortOption, Product } from "@/app/types/product.types";
import { useProducts, useDeleteProduct } from "@/app/hooks/useProducts";
import { APP_ROUTES } from "@/app/constants/routes";
import Loading from "@/app/components/common/Loading";
import { useAuthStore } from "@/app/store/auth.store";
import { GenericDialog } from "@/app/components/common";
import { toast } from "sonner";
import api from "@/app/services/api/axios";

interface SyncResult {
  variantSku: string;
  variantTitle: string;
  stripeProductId: string;
  stripePriceId: string;
  amount: number;
  currency: string;
}

interface SyncResponse {
  message: string;
  success: boolean;
  data: {
    success: boolean;
    synced: SyncResult[];
    failed: any[];
    total: number;
  };
  timestamp: string;
}

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

  // Stripe sync states
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncResultDialog, setShowSyncResultDialog] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResponse | null>(null);

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

  // Stripe sync handler
  const handleSyncToStripe = async () => {
    setIsSyncing(true);

    try {
      const res = await api.get(`/tenant/integrations/stripe/sync-products`);
      if (!res) {
        throw new Error("Failed to sync products to Stripe");
      }

      const data = res.data as SyncResponse;

      if (data.success) {
        setSyncResult(data);
        setShowSyncResultDialog(true);
        toast.success(
          `Successfully synced ${data.data.synced.length} products to Stripe`,
        );
      } else {
        throw new Error(data.message || "Sync failed");
      }
    } catch (error: any) {
      console.error("Stripe sync error:", error);
      toast.error(error.message || "Failed to sync products to Stripe");
    } finally {
      setIsSyncing(false);
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

        <div className="flex items-center gap-3">
          {/* Sync to Stripe Button */}
          <Button
            label={isSyncing ? "Syncing..." : "Sync to Stripe"}
            IconLeft={
              isSyncing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <RefreshCw size={20} />
              )
            }
            variant="secondary"
            onClick={handleSyncToStripe}
            disabled={isSyncing}
          />

          {/* Add New Product Button */}
          <Button
            label="Add New Products"
            IconLeft={<Plus size={24} />}
            variant="primary"
            onClick={handleCreateNewProduct}
          />
        </div>
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

      {/* Sync Result Dialog */}
      <GenericDialog
        open={showSyncResultDialog}
        onClose={() => setShowSyncResultDialog(false)}
        title="Stripe Sync Results"
        maxWidth="xl"
      >
        {syncResult && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">
                  Sync Completed Successfully
                </h3>
              </div>
              <p className="text-sm text-green-700">
                {syncResult.data.total} products synced to Stripe
              </p>
            </div>

            {/* Success List */}
            {syncResult.data.synced.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Successfully Synced ({syncResult.data.synced.length})
                </h4>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {syncResult.data.synced.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span>Product Name: </span>
                          <p className="font-medium text-gray-800">
                            {item.variantTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            SKU: {item.variantSku}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          ${(item.amount / 100).toFixed(2)}{" "}
                          {item.currency.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Product ID:</span>
                          <p className="font-mono text-gray-700 break-all">
                            {item.stripeProductId}
                          </p>
                        </div>
                        {/* <div>
                          <span className="text-gray-500">Price ID:</span>
                          <p className="font-mono text-gray-700 break-all">
                            {item.stripePriceId}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Failed List */}
            {syncResult.data.failed.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Failed to Sync ({syncResult.data.failed.length})
                </h4>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {syncResult.data.failed.map((item, index) => (
                    <div
                      key={index}
                      className="bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      <p className="text-sm text-red-800">
                        {JSON.stringify(item)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end pt-4 border-t">
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                onClick={() => setShowSyncResultDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </GenericDialog>
    </div>
  );
};

export default AllProductsPage;
