import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShoppingBag,
  CreditCard,
  Users,
  Zap,
  TrendingUp,
  Heart,
} from "lucide-react";
import { Badge } from "@/app/components/ui";
import { scaleFeature } from "@/app/utils/utils";
import { cn } from "@/app/utils/cn";

const ScaleBusiness: React.FC = () => {
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

  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Users,
    Zap,
    Heart,
    TrendingUp,
  };

  return (
    <div className="min-h-screen bg-base-white py-16 px-4 md:px-32">
      <div className="max-w-7xl">
        <motion.div
          className="flex justify-between gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Section - Typography and scaleFeature */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Badge */}
            <Badge title="Scale Your Business" />

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className={cn("text-grey", "h2-semi-bold-40")}>
                Who is <span className="text-primary">Assistant</span> for?
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="h4-regular-24 text-grey-medium max-w-xl"
              variants={itemVariants}
            >
              If you talk to customers online, Assistant is for you.
            </motion.p>

            {/* Feature List */}
            <motion.div className="space-y-4" variants={itemVariants}>
              {scaleFeature.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                return (
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
                    <div className="flex items-center space-x-3">
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors duration-200" />
                      )}
                      <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Text */}
            <motion.div
              className="pt-6 border-t border-gray-200"
              variants={itemVariants}
            >
              <p className="body-regular-16 text-grey">
                Whether you're running a one-person shop or managing a team,{" "}
                <span className="text-primary">
                  Assistant helps you reply faster, stay organized, and grow
                  your business
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Section - Vertical Auto-scrolling imageSlides */}
          <motion.div
            className="relative h-[600px] lg:h-[700px]"
            variants={itemVariants}
          >
            {/* Image section */}
            <motion.figure>{/* <img src={image} alt="" /> */}</motion.figure>
            {/* Floating Elements */}
            {/* Shopping Bag */}
            {/* <motion.div
              className="absolute top-0 -left-4 w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-xl shadow-lg flex items-center justify-center z-20"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ShoppingBag className="w-8 h-8 text-white" />
            </motion.div> */}
            {/* Card */}
            {/* <motion.div
              className="absolute bottom-0 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg shadow-lg flex items-center justify-center z-20"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </motion.div> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScaleBusiness;
