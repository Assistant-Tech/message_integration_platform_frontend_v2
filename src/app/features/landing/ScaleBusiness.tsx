import React from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag, CreditCard } from "lucide-react";
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

  return (
    <div className="min-h-auto max-w-[1600px] mx-auto py-20 px-4 md:px-2">
      <div className="w-full">
        <motion.div
          className="flex flex-col lg:flex-row justify-between gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Section - Text and Features */}
          <motion.div
            className="space-y-8 w-full lg:max-w-xl"
            variants={itemVariants}
          >
            {/* Badge */}
            <Badge title="Scale Your Business" />

            {/* Heading */}
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
                      <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
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

          {/* Right Section - Animation Area */}
          <motion.div
            className="relative h-[500px] w-full max-w-md"
            variants={itemVariants}
          >
            {/* Floating Shopping Bag */}
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-xl shadow-lg flex items-center justify-center z-10"
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
            </motion.div>

            {/* Floating Credit Card */}
            <motion.div
              className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg shadow-lg flex items-center justify-center z-10"
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
            </motion.div>

            {/* Placeholder illustration or image */}
            <motion.figure
              className="w-full h-full bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center"
              variants={itemVariants}
            >
              <span className="text-gray-400">
                Insert Illustration or Dashboard Image
              </span>
            </motion.figure>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScaleBusiness;
