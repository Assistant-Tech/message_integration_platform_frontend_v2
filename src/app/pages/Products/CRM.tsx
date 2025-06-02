import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import { Zap, Target, ArrowRight, Circle, Check } from "lucide-react";

import { Breadcrumb, Button, Input } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { benefits, features } from "@/app/utils/product/crm";
// import { GetStarted } from "@/app/pages/landing/";

import crm from "@/app/assets/images/crm.webp";
import business from "@/app/assets/images/CRM1.webp";
import purchase from "@/app/assets/images/CRM2.webp";
import { FAQ, Pricing } from "@/app/pages/landing/";

const CRM: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const CrmBreadCrumb = [
    { label: "Products", href: "/products" },
    { label: "CRM" },
  ];

  const handleGetStarted = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Starting trial with email:", email);
  };

  return (
    <div className="bg-white mt-24">
      <div>
        {/* Breadcrumb Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Breadcrumb items={CrmBreadCrumb} />
        </motion.div>

        {/* EMPOWER BUSINESS */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 max-w-2xl order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-black leading-tight">
                Empowering Your Business with
                <span className="text-primary ps-2">Assistant's</span>{" "}
                AI-Powered CRM Software
              </h1>

              <p className="text-sm sm:text-base text-grey-medium max-w-2xl leading-relaxed">
                Assistant Tech's CRM software helps you respond to your customer
                inquiries instantly and efficiently. It streamlines your
                company's workflow, helps with customer retention and
                simultaneously reduces marketing costs.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-grey-medium">
                Start your 14-days free trial today!
              </p>

              {/* Input  */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your email"
                    variant="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:border-primary focus:ring-1 focus:ring-primary w-full h-12 sm:h-auto"
                  />
                </div>
                {/* Button */}
                <Button
                  label={isLoading ? "Loading..." : "Get Started"}
                  variant="primary"
                  onClick={handleGetStarted}
                  disabled={isLoading || !email}
                  IconRight={
                    !isLoading ? <ArrowRight className="w-4 h-4" /> : undefined
                  }
                  className="w-full sm:w-48 whitespace-nowrap h-12 sm:h-auto"
                />
              </div>

              <p className="text-xs sm:text-sm text-grey-medium leading-relaxed">
                No credit card needed. By providing your contact information,
                you agree to
                <a
                  href="#"
                  className="text-primary hover:text-primary-dark underline px-1 sm:px-2"
                >
                  Terms of Service
                </a>
                and
                <a
                  href="#"
                  className="text-primary hover:text-primary-dark underline px-1 sm:px-2"
                >
                  Privacy Policy
                </a>
                of the company.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 p-2 bg-primary-light rounded-lg text-primary">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1 text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-grey-medium text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
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
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 space-y-1 sm:space-y-2 z-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className={cn(
                      "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-white text-xs sm:text-sm font-medium",
                      benefit.color,
                    )}
                  >
                    <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    <span className="hidden sm:inline">{benefit.title}</span>
                  </motion.div>
                ))}
              </div>

              {/* Main CRM Visual */}
              <div className="p-4 sm:p-6 md:p-8 text-white relative h-64 sm:h-80 md:h-96 lg:h-[500px] aspect-auto">
                {/* Network Visualization */}
                <div className="absolute inset-0 opacity-90">
                  <img
                    src={crm}
                    alt="crm.webp"
                    className="w-full h-full object-cover sm:object-fill"
                  />
                </div>
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
              className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-primary-light rounded-xl flex items-center justify-center"
            >
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
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
              className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-information-light rounded-xl flex items-center justify-center"
            >
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-information-dark" />
            </motion.div>
          </motion.div>
        </div>

        {/* SCALE YOUR BUSINESS */}
        <Flex
          justify="between"
          align="center"
          className="py-12 sm:py-16 md:py-20 flex-col lg:flex-row gap-8 lg:gap-16"
        >
          {/* Right side image section */}
          <motion.div className="relative w-full lg:w-full max-w-3xl order-2 lg:order-1">
            {/* SVG behind images */}
            <div className="absolute -left-8 sm:-left-16 bottom-0 -z-10">
              <Circle
                size={100}
                className="opacity-65 sm:w-[150px] sm:h-[150px]"
                color="orange"
              />
            </div>
            {/* Main image */}
            <motion.figure className="rounded-2xl overflow-hidden">
              <img
                src={business}
                alt="Online business"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.figure>

            {/* Overlapping image */}
            <motion.figure className="absolute -bottom-6 sm:-bottom-12 right-4 sm:right-10 w-48 sm:w-64 md:w-72 rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
              <img
                src={purchase}
                alt="purchase blocks"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.figure>
          </motion.div>

          <motion.article className="w-full lg:w-xl max-w-xl space-y-4 sm:space-y-6 order-1 lg:order-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-black">
              Scale Your Business
            </h1>
            <p className="text-grey-medium text-sm sm:text-base leading-relaxed">
              Whether you're a startup or an enterprise, our AI-enabled CRM
              helps take your business to next level...
            </p>
            <ul className="space-y-3 sm:space-y-4 text-grey-medium text-sm sm:text-base">
              <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mt-1 sm:mt-1 flex-shrink-0">
                  <Check size="16" className="sm:w-6 sm:h-6" color="teal" />
                </div>
                <span className="leading-relaxed">
                  Online store owners who want to reply fast on social media
                </span>
              </li>
              <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mt-1 sm:mt-1 flex-shrink-0">
                  <Check size="16" className="sm:w-6 sm:h-6" color="teal" />
                </div>
                <span className="leading-relaxed">
                  Small businesses that want to support customers better
                </span>
              </li>
              <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mt-1 sm:mt-1 flex-shrink-0">
                  <Check size="16" className="sm:w-6 sm:h-6" color="teal" />
                </div>
                <span className="leading-relaxed">
                  Big enterprises looking for efficiency, control and long-term
                  value.
                </span>
              </li>
            </ul>
            <Button
              label="Book a Demo"
              variant="primary"
              redirectTo="/demo"
              className="w-full h-12 sm:h-auto"
            />
          </motion.article>
        </Flex>

        {/* PRICING */}
        <Pricing />
        {/* FAQ */}
        <FAQ />
        {/* FOOTER */}
      </div>
    </div>
  );
};

export default CRM;
