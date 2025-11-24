import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockProducts } from "@/app/utils/product.mock";
import { Product } from "@/app/types/product.types";
import SelectedImage from "@/app/components/common/SelectedImage";
import { APP_ROUTES } from "@/app/constants/routes";
import { Breadcrumb } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ProductsCrumbs = [
    { label: "All Products", href: APP_ROUTES.ADMIN.PRODUCTS_ALL },
    { label: "Product Details" },
  ];

  const product: Product | undefined = mockProducts.find(
    (p) => p.product_id === id,
  );

  const handleBack = () => navigate(-1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-black mb-2">
            Product Not Found
          </h2>
          <button
            onClick={handleBack}
            className="text-primary font-medium hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white py-2 md:py-6 px-6 md:px-6">
      <div className="mb-8">
        <div className="flex flex-col justify-start items-start mb-3 gap-3">
          <Heading title="Products" align="left" className="text-base-black" />
          <Breadcrumb items={ProductsCrumbs} />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-10 justify-center items-start">
        {/* Left: Image + Description */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg flex flex-col gap-6"
        >
          {/* Local state for selected image */}
          <SelectedImage product={product} />
        </motion.div>

        {/* Right Info */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-7xl flex flex-col gap-6"
        >
          {/* Title + Price */}
          <div>
            <h2 className="text-3xl font-bold text-black">{product.name}</h2>
            <p className="text-2xl font-semibold text-grey-medium mt-1">
              ${product.price}
            </p>
          </div>

          {/* Description Section */}
          <div className="bg-white border border-grey-light rounded-xl p-6">
            <h3 className="text-lg font-semibold text-black mb-3">
              Product Description
            </h3>

            <p className="text-grey-medium leading-relaxed text-sm">
              {product.description
                ? product.description
                : "This product is crafted with premium-quality materials and designed to deliver outstanding performance and durability. Every detail has been carefully considered to ensure a seamless experience, making it ideal for both daily use and professional workflows. Built with precision and quality — it delivers unmatched value."}
            </p>
          </div>

          {/* Properties */}
          <div className="bg-white rounded-xl p-6 space-y-4 border border-grey-light">
            <Detail label="Product ID" value={product.product_id} />
            <Detail label="SKU" value={product.SKU} />
            <Detail label="Variant" value={product.variants} />

            {/* Color Badge */}
            <div className="flex justify-between items-center border-b border-grey-light pb-4">
              <p className="text-sm font-semibold text-grey uppercase tracking-wider">
                Color
              </p>

              <span
                className={`
                  px-4 py-1 text-white rounded-full text-sm font-medium
                  ${product.color}
                `}
              >
                {product.color.replace("bg-", "").replace("-", " ")}
              </span>
            </div>

            <Detail
              label="Visibility"
              value={product.visibility ? "Visible" : "Hidden"}
            />
            <Detail label="Status" value={product.status} />
          </div>

          {/* Actions */}
          <div className="w-72 flex gap-3 pt-4">
            <button className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition">
              Edit Product
            </button>
            <button className="px-6 py-3 border border-grey-dark rounded-lg font-medium text-grey-dark hover:bg-grey-light transition">
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean;
}) => (
  <div className="flex justify-between border-b border-grey-light pb-3">
    <p className="text-sm font-semibold text-grey uppercase tracking-wider">
      {label}
    </p>
    <p className="text-base font-medium text-black">{value}</p>
  </div>
);
