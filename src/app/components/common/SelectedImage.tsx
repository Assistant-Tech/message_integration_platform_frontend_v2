import { Product } from "@/app/types/product.types";
import { useState } from "react";

const SelectedImage = ({ product }: { product: Product }) => {
  const images = product.images.map((img) => ({
    ...img,
    fullUrl: `http://localhost:3000${img.url}`,
  }));

  const primaryImage = images.find((img) => img.isPrimary) || images[0];

  const [mainImage, setMainImage] = useState(primaryImage?.fullUrl);

  return (
    <div>
      {/* Main Image */}
      <div className="rounded-md overflow-hidden bg-grey-light">
        <img
          src={mainImage}
          alt={primaryImage?.alt || product.title}
          className="w-full aspect-square object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex items-center gap-3 mt-4">
        {images.map((img, index) => (
          <button
            key={img.id || index}
            onClick={() => setMainImage(img.fullUrl)}
            className={`w-20 h-20 rounded-md overflow-hidden border ${
              mainImage === img.fullUrl
                ? "border-primary"
                : "border-grey-light hover:border-grey-dark"
            }`}
          >
            <img
              src={img.fullUrl}
              alt={img.alt || `Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectedImage;
