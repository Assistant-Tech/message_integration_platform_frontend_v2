import React from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag, CreditCard } from "lucide-react";
import { Badge } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import landing from "@/app/content/json/landing.json";

const ScaleBusiness: React.FC = () => {
  const { scaleBusiness } = landing;

  const {
    badge,
    title,
    highlight,
    description,
    audienceFeatures,
    closingText,
    sliderImages,
  } = scaleBusiness;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="pt-20">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section */}
        <motion.div
          className="space-y-5 w-full lg:max-w-xl text-center lg:text-left"
          variants={itemVariants}
        >
          <Badge title={badge} textStyle="body-italic-bold-16" />

          <h1 className={cn("text-grey", "h2-semi-bold-40")}>
            {title.split(highlight)[0]}
            <span className="text-primary">{highlight}</span>
            {title.split(highlight)[1]}
          </h1>

          <p className="h4-regular-24 text-grey-medium max-w-xl">
            {description}
          </p>

          <div className="space-y-4 max-w-xl">
            {audienceFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                className="flex items-start space-x-4 group cursor-pointer"
                variants={itemVariants}
                whileHover={{ x: 8 }}
              >
                <div className="w-6 h-6 mt-1 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary-inactive transition">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-gray-700 group-hover:text-gray-900 transition">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="body-regular-16 text-grey">
            {closingText.split("Chatblix")[0]}
            <span className="text-primary">Chatblix</span>
            {closingText.split("Chatblix")[1]}
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div className="relative h-[60vh] w-full overflow-hidden rounded-2xl">
          {/* Floating Icons */}
          <motion.div
            className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-xl flex items-center justify-center z-20"
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ShoppingBag className="text-white" />
          </motion.div>

          <motion.div
            className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center z-20"
            animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <CreditCard className="text-white" />
          </motion.div>

          {/* Scroll Images */}
          <motion.div
            className="flex flex-col gap-4"
            animate={{ y: [0, -800] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ height: "200%" }}
          >
            {sliderImages.map((item, index) => (
              <div
                key={index}
                className="mx-4 h-[264px] rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScaleBusiness;
