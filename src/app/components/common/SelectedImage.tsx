import { Product } from "@/app/types/product.types";
import { useState } from "react";

const SelectedImage = ({ product }: { product: Product }) => {
  const [mainImage, setMainImage] = useState(product.image);

  // If you add more image URLs later, include them here
  const thumbnails = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div>
      {/* Main Image */}
      <div className="rounded-md overflow-hidden bg-grey-light">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full aspect-square object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-3 mt-4">
        {thumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`w-20 h-20 rounded-md overflow-hidden border
              ${
                mainImage === img
                  ? "border-primary"
                  : "border-grey-light hover:border-grey-dark"
              }
            `}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectedImage;
