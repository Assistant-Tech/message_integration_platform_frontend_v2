import { motion } from "framer-motion";
import { Agreement, Button } from "@/app/components/ui";
import crm from "@/app/assets/images/crm.webp";
import ProductGrid from "./ProductGrid";
import { GetStarted, Pricing } from "@/app/pages/landing/";
import { FrequentlyAskedQuestion } from "@/app/components/common";

const Product = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <motion.section
        className="px-4 sm:px-4 lg:px-px"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <h1 className="h2-bold-40 text-base-black pt-6">Product</h1>
          </motion.div>
        </div>
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Left Side */}
          <motion.div variants={itemVariants} className="space-y-6 max-w-2xl">
            <motion.h1
              className="h2-bold-40 text-base-black text-start"
              variants={itemVariants}
            >
              Easy Solution For All
              <span className="block text-primary">Your Company's Need</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-grey-medium leading-relaxed"
              variants={itemVariants}
            >
              Explore all our AI-powered products available to help you manage
              your customers, work with your team and grow your business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button
                label="Start 14-days Free Trial"
                variant="primary"
                className="px-2 py-3"
              />
              <Button
                label="Book a Demo"
                variant="outlined"
                redirectTo="/demo"
                className="px-2 py-3"
              />
            </motion.div>

            <div>
              <span className="text-sm text-grey">
                No credit cards needed.{" "}
              </span>
              <Agreement />
            </div>
          </motion.div>

          {/* Right side image */}
          <motion.figure
            variants={itemVariants}
            className="relative w-full h-full max-w-2xl mx-auto"
          >
            {/* Desktop Image */}
            <img
              src={crm}
              alt="Desktop UI"
              className="w-full h-auto rounded-xl"
            />

            {/* Mobile overlapping image */}
            <img
              src={crm}
              alt="Mobile UI"
              className="absolute w-1/2 sm:w-1/3 h-96 top-6 sm:top-10 left-4 sm:-left-20 rounded-xl shadow-lg"
              style={{ transform: "translateY(20%)" }}
            />
          </motion.figure>
        </div>
      </motion.section>

      {/* Product Grid */}
      <ProductGrid />

      {/* GET STARTED */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <GetStarted />
      </div>

      {/* Pricing */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-16">
        <Pricing />
      </div>

      {/* FAQ */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-16">
        <FrequentlyAskedQuestion />
      </div>
    </div>
  );
};

export default Product;
