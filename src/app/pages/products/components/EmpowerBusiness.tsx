import { motion } from "framer-motion";
import { benefits, features } from "@/app/utils/product/product.config";
import { cn } from "@/app/utils/cn";
import { EmailSignupCTA } from "@/app/pages/products/components/";
import crm from "@/app/content/json/crm.json";

const EmpowerBusiness = () => {
  const { empowerBusiness } = crm;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1 max-w-xl"
      >
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="h2-bold-40 text-base-black">
            {empowerBusiness.heading.title}
            <span className="text-primary block sm:inline sm:ps-2">
              <span className="block sm:inline">
                {empowerBusiness.heading.highlight}
              </span>
            </span>
          </h1>

          <p className="body-regular-16 text-grey-medium">
            {empowerBusiness.description}
          </p>
        </div>

        <EmailSignupCTA
          title="Join 1,000+ businesses using our platform"
          placeholder="Your work email"
          buttonLabel="Start Free Trial"
          note="Free for 14 days. Cancel anytime."
          onSubmit={(email) => console.log("Submitted email:", email)}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 sm:gap-4 cursor-pointer"
            >
              <img src={feature.icon} className="w-8 h-8" />
              <div className="min-w-0">
                <h3 className="body-regular-16 text-primary mb-1">
                  {feature.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Right Visual */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className=" order-1 lg:order-2 w-full"
      >
        <div className=" rounded-2xl overflow-hidden">
          {/* Benefit Tags */}
          <div className="absolute top-12 sm:top-14 md:top-20 right-6 sm:right-14 md:-right-16 space-y-1 sm:space-y-2 z-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-lg text-white font-medium",
                  "text-xs sm:text-sm md:text-base",
                  benefit.color,
                )}
              >
                <benefit.icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                <span className="hidden sm:inline whitespace-nowrap">
                  {benefit.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Main CRM Visual */}
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
            <img
              src={
                "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920902/CRM1_vfsdiz.webp"
              }
              alt="CRM Dashboard"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmpowerBusiness;
