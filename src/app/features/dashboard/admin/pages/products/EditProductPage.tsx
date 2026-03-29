import { useNavigate, useParams } from "react-router-dom";
import { useProductById, useUpdateProduct } from "@/app/hooks/useProducts";
import { Breadcrumb, Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { Loading } from "@/app/components/common/";
import { useAuthStore } from "@/app/store/auth.store";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tenantSlug = useAuthStore((s) => s.tenantSlug);

  const { data: product, isLoading } = useProductById(id!);
  const updateMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleBack = () => {
    navigate(`/app/${tenantSlug}/admin/products/all`);
  };

  const OrderBreadCrumb = [
    { label: "All Products", onClick: handleBack },
    { label: "Edit Product" },
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      await updateMutation.mutateAsync({
        productId: id,
        data: formData,
      });

      toast.success("Product updated successfully");

      navigate(`/app/${tenantSlug}/admin/products/all`);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/app/${tenantSlug}/admin/products/all`);
  };

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-danger">Product not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-4">
          <div>
            <Heading
              title="Edit Product"
              align="left"
              className="text-base-black"
            />
            <Breadcrumb items={OrderBreadCrumb} className="py-2" />
            <p className="text-sm text-grey-medium mt-1">
              Update product details
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button label="Cancel" variant="outlined" onClick={handleCancel} />
          <Button
            label="Save Changes"
            IconLeft={<Save size={20} />}
            variant="primary"
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
          />
        </div>
      </div>

      {/* Product Info Display (Read-only) */}
      <div className="bg-base-white rounded-lg border border-grey-light p-6 space-y-3">
        <h3 className="text-lg font-semibold text-grey">Product Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-grey-medium">SKU:</span>
            <span className="ml-2 font-medium">{product.sku}</span>
          </div>
          <div>
            <span className="text-grey-medium">Status:</span>
            <span className="ml-2 font-medium capitalize">
              {product.status}
            </span>
          </div>
          <div>
            <span className="text-grey-medium">Variants:</span>
            <span className="ml-2 font-medium">
              {product.variants?.length || 0}
            </span>
          </div>
          <div>
            <span className="text-grey-medium">Total Stock:</span>
            <span className="ml-2 font-medium">
              {product.variants?.reduce(
                (sum: any, v: { inventory: { stock: any } }) =>
                  sum + (v.inventory?.stock || 0),
                0,
              )}
            </span>
          </div>
        </div>
        <p className="text-xs text-grey-medium mt-2">
          To edit variants, images, or other details, please contact support
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 ">
        {/* Basic Information Card */}
        <div className="bg-white rounded-lg border border-grey-light p-6 space-y-4">
          <h3 className="text-lg font-semibold text-grey">Basic Information</h3>

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block body-bold-16 text-grey-medium"
            >
              Product Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-infromation focus:border-transparent body-regular-16 text-grey-medium"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block body-bold-16 text-grey-medium"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-infromation focus:border-transparent resize-none body-regular-16 text-grey-medium"
              placeholder="Enter product description"
              required
            />
            <p className="text-xs text-grey-medium">
              {formData.description.length} characters
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
