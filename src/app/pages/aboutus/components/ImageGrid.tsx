import { motion } from "framer-motion";

interface ImageItem {
  id: number;
  src: string;
  colSpan: string;
  rowSpan: string;
  alt?: string;
}

const ImageGrid: React.FC = () => {
  const images: ImageItem[] = [
    // Top left (tall narrow)
    {
      id: 1,
      src: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1777185001/about-1_thkabu.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-2",
    },
    // Top right (man with email icon)
    {
      id: 3,
      src: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1777185001/about-3_hhnewg.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    // Middle left (developer at desk)
    {
      id: 4,
      src: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1777185001/about-6_l23jal.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-2",
    },
    // Middle right (AI robot hand)
    {
      id: 5,
      src: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1777185001/about-2_i8yhsd.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 min-w-full ">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className={`relative overflow-hidden rounded-2xl ${image.colSpan} ${image.rowSpan} shadow-lg`}
        >
          <img
            src={image.src as unknown as string}
            alt={image.alt || `Image ${image.id}`}
            className="object-cover w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
