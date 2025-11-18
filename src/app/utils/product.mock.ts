import { Product } from "../types/product.types";

// Helper function to randomly select a status
const getRandomStatus = () => {
  const statuses = ["Success", "In Progress", "Draft"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to generate a random price
const getRandomPrice = (min: number, max: number) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Helper function to get a random color (simple hex)
const getRandomColor = () => {
  const colors = [
    "#1e90ff",
    "#2b2d42",
    "#000000",
    "#800080",
    "#FF69B4",
    "#4CAF50",
    "#FFC107",
    "#E91E63",
    "#00BCD4",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Common product categories for variation
const productNames = [
  "V-Neck Sweater",
  "Leather Backpack",
  "Running Shoe",
  "Cotton Polo",
  "Slim-Fit Chinos",
  "Maxi Dress",
  "Sport Watch",
  "Wireless Earbuds",
  "Insulated Water Bottle",
  "Yoga Mat",
  "Winter Coat",
  "Sunglasses",
  "Graphic Tee",
  "Knit Beanie",
  "High-Waist Leggings",
  "Casual Loafers",
  "Utility Jacket",
  "Pencil Skirt",
  "Tote Bag",
  "Smart Scale",
  "Silk Scarf",
  "Denim Jacket",
  "Lace Bodysuit",
  "Weighted Blanket",
  "Desk Lamp",
];

// Combine to get 50 unique names (by mixing with descriptors)
const allProductNames: string[] = [];
const descriptors = [
  "Premium",
  "Lightweight",
  "Durable",
  "Eco-Friendly",
  "Vintage",
];
let nameCount = 0;

for (let i = 0; i < productNames.length && nameCount < 50; i++) {
  allProductNames.push(productNames[i]);
  nameCount++;
  if (i < descriptors.length && nameCount < 50) {
    allProductNames.push(`${descriptors[i]} ${productNames[i]}`);
    nameCount++;
  }
}

// Ensure at least 50 names, or pad if necessary (though the above logic should handle it)
while (allProductNames.length < 50) {
  allProductNames.push(`Generic Item ${allProductNames.length + 1}`);
}

// MOCK PRODUCTS - 50 ENTRIES
export const mockProducts: Product[] = allProductNames
  .slice(0, 50)
  .map((name, index) => {
    const id = index + 1;
    const baseName = name.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    const status = getRandomStatus() as any; // Cast for compatibility with inferred Status enum values
    const isVisible = Math.random() > 0.3; // 70% visible
    const price = getRandomPrice(15, 199.99);
    const variantsList =
      name.includes("Shoe") || name.includes("Loafers")
        ? "8, 9, 10, 11"
        : "S, M, L, XL";

    return {
      product_id: `prod_${id.toString().padStart(3, "0")}`,
      name: name,
      // Using a single placeholder image for consistency, but in a real app, this would vary
      image: "https://m.media-amazon.com/images/I/61GfWyQax7L._AC_UL1500_.jpg",
      price: price,
      SKU: `${baseName.substring(0, 4)}_${id.toString().padStart(3, "0")}`,
      variants: variantsList,
      visibility: isVisible,
      status: status,
      color: getRandomColor(),
      action: "",
    };
  });
