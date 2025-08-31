import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { BLOG_IMAGE_URL } from "@/app/constants/image-cloudinary";

const BlogCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl bg-base-white mb-20 p-8">
        <img
          src={BLOG_IMAGE_URL}
          alt="CRM Dashboard"
          className="w-full h-96 object-cover rounded-xl"
        />
        <div className="py-6 px-2 text-grey">
          <div className="flex items-center justify-between text-muted-foreground text-sm mb-2">
            <span className="text-primary label-bold-14">CRM</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              May 27, 2025
            </span>
          </div>
          <h2 className="h4-bold-24 text-base-black mb-2">
            Aliquam a dui vel justo fringilla euismod id id enim. Nunc non
            semper tellus
          </h2>
          <p className="h5-regular-16 text-grey-medium">
            Aliquam a dui vel justo fringilla euismod id id enim. Nunc non
            semper tellus. Pellentesque vitae tellus non dui fermentum
            hendrerit. In velee…
          </p>
          <div className="flex items-center gap-3 mt-6">
            <img
              src={
                "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753878936/jane_iasge7.png"
              }
              alt="Jane Doe"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <div className="font-medium text-foreground">Jane Doe</div>
              <div className="text-muted-foreground">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default BlogCard;
