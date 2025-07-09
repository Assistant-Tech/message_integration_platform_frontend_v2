import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Target } from "lucide-react";

import { Agreement, Input } from "@/app/components/ui";
import { Button } from "@/app/components/ui";
import { benefits, features } from "@/app/utils/product/utils";
import { cn } from "@/app/utils/cn";
import { FeatureBadge } from "@/app/pages/products/components";

import crm from "@/app/assets/images/crm.webp";

const EmpowerBusiness = () => {
  const [email, setEmail] = useState("");

  const handleGetStarted = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1 max-w-2xl"
      >
        <FeatureBadge text="AI-Powered CRM" />
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="h2-bold-40 text-base-black">
            Empowering Your Business with Assistant's
            <span className="text-primary block sm:inline sm:ps-2">
              <span className="block sm:inline">AI-Powered CRM Software</span>
            </span>
          </h1>

          <p className="body-regular-16 text-grey-medium">
            Assistant Tech's CRM software helps you respond to your customer
            inquiries instantly and efficiently. It streamlines your company's
            workflow, helps with customer retention and simultaneously reduces
            marketing costs.
          </p>
        </div>

        {/* CTA Section */}
        <div className="space-y-3 sm:space-y-4">
          <p className="body-regular-16 text-grey-medium">
            Start your 14-days free trial today!
          </p>

          {/* Input & Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <div className="flex-1">
              <Input
                placeholder="Enter your email"
                variant="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:border-primary focus:ring-1 focus:ring-primary w-full h-12 sm:h-14 text-base"
              />
            </div>
            <Button
              label={"Get Started"}
              variant="primary"
              onClick={handleGetStarted}
              className="py-3"
            />
          </div>

          <div className="body-regular-16 text-grey-medium">
            No credit card needed.
            <Agreement />
          </div>
        </div>

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
        className="relative order-1 lg:order-2"
      >
        <div className="relative rounded-2xl overflow-hidden">
          {/* Benefit Tags */}
          <div className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 space-y-1 sm:space-y-2 z-10">
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
              src={crm}
              alt="CRM Dashboard"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-2 sm:-top-4 md:-top-6 -left-2 sm:-left-4 md:-left-6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-primary-light rounded-xl flex items-center justify-center"
        >
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-2 sm:-bottom-4 md:-bottom-6 -right-2 sm:-right-4 md:-right-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-information-light rounded-xl flex items-center justify-center"
        >
          <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-information-dark" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmpowerBusiness;
