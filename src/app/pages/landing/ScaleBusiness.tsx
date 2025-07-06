import React from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag, CreditCard } from "lucide-react";
import { Badge } from "@/app/components/ui";
import { scaleFeature } from "@/app/utils/utils";
import { cn } from "@/app/utils/cn";

const ScaleBusiness: React.FC = () => {
  // Image Slider
  const sliderImage = [
    {
      name: "Scale",
      img: "https://res.cloudinary.com/demo/image/upload/v1616784721/cld-sample-3.jpg",
    },
    {
      name: "Scale",
      img: "https://res.cloudinary.com/demo/image/upload/w_800/sample.jpg",
    },
    {
      name: "Scale",
      img: "https://res.cloudinary.com/demo/image/upload/v1616784721/cld-sample-4.jpg",
    },
    {
      name: "Scale",
      img: "https://res.cloudinary.com/demo/image/upload/w_800/sample.jpg",
    },
    {
      name: "Scale",
      img: "https://res.cloudinary.com/demo/image/upload/v1616784721/cld-sample-3.jpg",
    },
    {
      name: "Scale",
      img: "https://res.cloudinary.com/demo/image/upload/v1616784721/cld-sample-4.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
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
      <div className="w-full">
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
            <Badge title="Scale Your Business" />

            <motion.div variants={itemVariants}>
              <h1 className={cn("text-grey", "h2-semi-bold-40")}>
                Who is <span className="text-primary">Assistant</span> for?
              </h1>
            </motion.div>

            <motion.p
              className="h4-regular-24 text-grey-medium mx-auto lg:mx-0 max-w-xl"
              variants={itemVariants}
            >
              If you talk to customers online, Assistant is for you.
            </motion.p>

            <motion.div
              className="space-y-4 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              {scaleFeature.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-200">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="body-regular-16 text-grey">
                Whether you're running a one-person shop or managing a team,{" "}
                <span className="text-primary">
                  Assistant helps you reply faster, stay organized, and grow
                  your business
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Section - Scrolling Images */}
          <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-[60vh] w-full max-w-1/2 overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            {/* Floating Icons */}
            <motion.div
              className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-xl shadow-lg flex items-center justify-center z-20"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ShoppingBag className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg shadow-lg flex items-center justify-center z-20"
              animate={{
                y: [0, 8, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <CreditCard className="w-5 h-5 text-white" />
            </motion.div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Images */}
            <motion.div
              className="flex flex-col gap-4"
              animate={{ y: [0, -800] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{ height: "200%" }}
            >
              {sliderImage.map((item, index) => (
                <div
                  key={index}
                  className="mx-4 h-[264px] bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default ScaleBusiness;
