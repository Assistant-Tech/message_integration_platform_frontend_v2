import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import { Zap, Target, ArrowRight, Circle, Check } from "lucide-react";

import { Breadcrumb, Button, Input, SmartCard } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { benefits, features, smartCardData } from "@/app/utils/product/utils";
import {
  FAQ,
  GetStarted,
  Pricing,
  SeemlessExperience,
} from "@/app/pages/landing/";
import { APP_ROUTES } from "@/app/constants/routes";

// Images
import crm from "@/app/assets/images/crm.webp";
import business from "@/app/assets/images/CRM1.webp";
import purchase from "@/app/assets/images/CRM2.webp";
import crm_video from "@/app/assets/images/crm_video.webp";

const CRM: React.FC = () => {
  const [email, setEmail] = useState("");

  // Video settings and play button
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const CrmBreadCrumb = [
    { label: "Products", href: APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW },
    { label: "CRM" },
  ];

  const handleGetStarted = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Starting trial with email:", email);
  };

  return (
    <div className="bg-white mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 lg:px-px">
      <div>
        {/* Breadcrumb Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <Breadcrumb items={CrmBreadCrumb} />
        </motion.div>

        {/* EMPOWER BUSINESS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-base-black leading-tight">
                Empowering Your Business with
                <span className="text-primary block sm:inline sm:ps-2">
                  Assistant's
                </span>{" "}
                <span className="block sm:inline">AI-Powered CRM Software</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-grey-medium leading-relaxed">
                Assistant Tech's CRM software helps you respond to your customer
                inquiries instantly and efficiently. It streamlines your
                company's workflow, helps with customer retention and
                simultaneously reduces marketing costs.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-grey-medium font-medium">
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
                  IconRight={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                />
              </div>

              <p className="text-xs sm:text-sm text-grey-medium leading-relaxed">
                No credit card needed. By providing your contact information,
                you agree to
                <a
                  href="#"
                  className="text-primary hover:text-primary-dark underline mx-1"
                >
                  Terms of Service
                </a>
                and
                <a
                  href="#"
                  className="text-primary hover:text-primary-dark underline mx-1"
                >
                  Privacy Policy
                </a>
                of the company.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-primary-light rounded-lg text-primary">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-primary mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-grey-medium text-xs sm:text-sm md:text-base leading-relaxed">
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

        {/* SCALE YOUR BUSINESS SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 py-2 sm:py-16 md:py-20 lg:py-24">
          {/* Image Section */}
          <motion.div className="relative w-full lg:w-1/2 max-w-7xl order-2 lg:order-1">
            {/* Background decoration */}
            <div className="absolute -left-4 sm:-left-8 md:-left-16 bottom-0 -z-10">
              <Circle
                size={80}
                className="opacity-65 sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] text-orange-400"
              />
            </div>

            {/* Main image */}
            <motion.figure className="rounded-2xl overflow-hidden pe-20">
              <img
                src={business}
                alt="Online business dashboard"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.figure>

            {/* Overlapping image */}
            <motion.figure className="absolute -bottom-4 sm:-bottom-8 md:-bottom-12 right-2 sm:right-6 md:right-10 w-32 sm:w-48 md:w-64 lg:w-72 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-white">
              <img
                src={purchase}
                alt="Purchase analytics"
                className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
              />
            </motion.figure>
          </motion.div>

          {/* Content Section */}
          <motion.div className="w-full lg:w-1/2 lg:max-w-xl space-y-4 sm:space-y-6 md:space-y-8 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-black leading-tight">
              Scale Your Business
            </h2>
            <p className="text-grey-medium text-sm sm:text-base md:text-lg leading-relaxed">
              Whether you're a startup or an enterprise, our AI-enabled CRM
              helps take your business to next level with intelligent automation
              and insights.
            </p>

            {/* Features List */}
            <ul className="space-y-3 sm:space-y-4 md:space-y-6">
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-1.5 sm:p-2 bg-primary-light rounded-full mt-0.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-600" />
                </div>
                <span className="text-grey-medium text-sm sm:text-base md:text-lg leading-relaxed">
                  Online store owners who want to reply fast on social media
                </span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-1.5 sm:p-2 bg-primary-light rounded-full mt-0.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-600" />
                </div>
                <span className="text-grey-medium text-sm sm:text-base md:text-lg leading-relaxed">
                  Small businesses that want to support customers better
                </span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-1.5 sm:p-2 bg-primary-light rounded-full mt-0.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-600" />
                </div>
                <span className="text-grey-medium text-sm sm:text-base md:text-lg leading-relaxed">
                  Big enterprises looking for efficiency, control and long-term
                  value
                </span>
              </li>
            </ul>

            <Button
              label="Book a Demo"
              variant="primary"
              redirectTo="/demo"
              className="w-full sm:w-auto sm:px-8 md:px-10 h-12 sm:h-14 text-base font-medium mt-6 sm:mt-8"
            />
          </motion.div>
        </div>

        {/* LEARN MORE ABOUT CRM SECTION */}
        <div className="py-10 sm:py-16 md:py-20 lg:py-24">
          {/* Heading & Text */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-8 sm:mb-12 md:mb-16">
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-black lg:max-w-lg leading-tight">
              Learn More About Our CRM Software
            </motion.h2>
            <motion.div className="lg:max-w-5xl">
              <p className="text-sm sm:text-base md:text-lg text-grey-medium leading-relaxed">
                Curious about how our software works? Watch this introductory
                video and learn how it's the best solution for your business.
                Explore more videos about our services{" "}
                <span className="text-primary underline cursor-pointer hover:text-primary-dark">
                  here
                </span>
                .
              </p>
            </motion.div>
          </div>

          {/* Video Section */}
          <div className="relative w-full max-w-6xl mx-auto aspect-video rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/videos/crm-intro.mp4"
              poster={crm_video}
              controls={false}
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 hover:bg-black/40 group"
                aria-label="Play video"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* GET STARTED */}
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
          <GetStarted />
        </div>

        {/* SMART SOLUTION BUSINES */}
        <Flex direction={"column"} justify={"center"} className="py-8 md:py-24">
          {/* Typo Section */}
          <motion.article>
            <motion.h1 className="h2-bold-40 text-base-black text-center pb-4">
              Smart Solutions for Businesses of All Sizes
            </motion.h1>
            <motion.p className="body-regular-16 text-grey text-center pb-6">
              Our AI-enabled CRM software focuses on providing smart solutions
              like sales, marketing and customer support, for businesses of all
              sizes and supports a sustainable business model.
            </motion.p>
          </motion.article>
          {/* Grided Cards Section */}
          <motion.div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center pt-6">
            {smartCardData.map((card, index) => (
              <SmartCard key={index} {...card} />
            ))}
          </motion.div>
        </Flex>

        {/* SEEMLESS EXPERIENCE */}
        <SeemlessExperience />

        {/* PRICING SECTION */}
        <Pricing />

        {/* FAQ SECTION */}
        <FAQ />
      </div>
    </div>
  );
};

export default CRM;
