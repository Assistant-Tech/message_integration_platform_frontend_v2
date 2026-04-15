import React from "react";
import { motion } from "framer-motion";
import { AnimatedProcessCard } from "@/app/components/animation";
import { Badge, Button } from "@/app/components/ui";
import { CREATE_BOT_IMAGE_URL } from "@/app/constants/image-cloudinary";

// Animation Variants
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ChatBot: React.FC = () => {
  const processes = [
    "Step 1 : Sign Up",
    "Step 2 : Onboarding",
    "Step 3 : Create Chatbot",
    "Step 4 : Add datasets to bot",
  ];

  return (
    <motion.div
      className="pt-10 md:pt-16 lg:pt-20 mb-10 md:mb-16 lg:mb-20"
      id="chatbot"
    >
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="flex flex-col md:flex-col lg:flex-row items-center justify-between gap-16 relative">
          {/* Left Section: Image + Animation */}
          <motion.div
            variants={itemVariants}
            className="relative w-full md:w-full lg:w-[70vw] px-4 md:px-0 lg:px-0"
          >
            {/* Floating Animated Cards - Responsive positioning */}
            <div className="absolute left-0 lg:-left-10 top-10 md:top-16 lg:top-20 -translate-y-1/2 z-10 hidden sm:block">
              <AnimatedProcessCard processes={processes} />
            </div>

            {/* Mobile Floating Cards - Show only on mobile */}
            <div className="absolute left-24 top-4 z-10 sm:hidden">
              <AnimatedProcessCard processes={processes} />
            </div>

            {/* Image */}
            <figure className="w-full flex justify-center">
              <img
                src={CREATE_BOT_IMAGE_URL}
                alt="Create Bot"
                className="w-full h-40 md:h-40 lg:h-40 object-contain"
                loading="lazy"
                width="620"
                height="450"
              />
            </figure>
          </motion.div>

          {/* Right Section: Text & CTA */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-full lg:w-full px-4 md:px-8 lg:px-14 flex flex-col items-center md:items-center lg:items-start"
          >
            <Badge
              title="AI DRIVEN CHATBOTS "
              textStyle="body-italic-bold-16"
            />

            <motion.h1
              variants={itemVariants}
              className="h2-bold-40 text-grey pt-4 xs:text-start sm:text-center md:text-center lg:text-start"
            >
              Create Your <span className="text-primary">AI Chatbots</span> in
              Minutes
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="h4-regular-24 text-grey-medium pt-4 xs:text-start sm:text-center md:text-center lg:text-start"
            >
              Create chatbots for sales, support, and more. Build intelligent
              conversational experiences that engage your customers 24/7 with
              our powerful AI platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 md:gap-4 pt-6 justify-center md:justify-center lg:justify-start"
            >
              <Button
                label="Start Free Trial"
                className="cursor-pointer w-full sm:w-auto p-3"
              />
              <Button
                label="Book a Demo"
                variant="outlined"
                className="cursor-pointer w-full sm:w-auto p-3"
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 md:gap-6 pt-6 md:pt-8 justify-center md:justify-center lg:justify-start"
            >
              <div className="text-center min-w-[80px] md:min-w-[90px]">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  10k+
                </div>
                <div className="text-xs md:text-sm text-primary-dark">
                  Active Chatbots
                </div>
              </div>
              <div className="text-center min-w-[80px] md:min-w-[90px]">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  99.9%
                </div>
                <div className="text-xs md:text-sm text-primary-dark">
                  Uptime
                </div>
              </div>
              <div className="text-center min-w-[80px] md:min-w-[90px]">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  24/7
                </div>
                <div className="text-xs md:text-sm text-primary-dark">
                  Support
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatBot;
