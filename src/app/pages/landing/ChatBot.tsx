import React from "react";
import { motion } from "framer-motion";
import { Box, Flex } from "@radix-ui/themes";
import { AnimatedProcessCard } from "@/app/components/animations/";
import createbot from "@/app/assets/images/createbot.webp";
import { Badge, Button } from "@/app/components/ui";

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
    "Chatbot Process One",
    "Chatbot Process Two",
    "Chatbot Process Three",
    "Chatbot Process Four",
  ];

  return (
    <Box className="pt-20 pb-4" id="chatbot">
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Flex
          direction={{ initial: "column", lg: "row" }}
          align="center"
          justify="between"
          gap="8"
          className="relative"
        >
          {/* Left Section: Image + Animation */}
          <motion.div
            variants={itemVariants}
            className="relative w-full lg:w-1/2 px-4 md:px-16 lg:px-0"
          >
            {/* Floating Animated Cards */}
            <div className="absolute left-0 lg:-left-10 top-20 -translate-y-1/2 z-10">
              <AnimatedProcessCard processes={processes} />
            </div>

            {/* Image */}
            <figure className="w-full">
              <img
                src={createbot}
                alt="Create Bot"
                className="w-full h-auto object-fill max-w-[720px] max-h-[550px]"
                loading="lazy"
                width="620"
                height="450"
              />
            </figure>
          </motion.div>

          {/* Right Section: Text & CTA */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 max-w-2xl px-4"
          >
            <Badge
              title="AI DRIVEN CHATBOTS "
              textStyle="body-italic-bold-16"
            />

            <motion.h1
              variants={itemVariants}
              className="h2-bold-40 text-grey pt-4"
            >
              Create Your Chatbots in{" "}
              <span className="text-primary">Minutes</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="h4-regular-24 text-grey-medium pt-4"
            >
              Create chatbots for sales, support, and more. Build intelligent
              conversational experiences that engage your customers 24/7 with
              our powerful AI platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-6"
            >
              <Button label="Start Free Trial" className="cursor-pointer" />
              <Button
                label="Book a Demo"
                variant="outlined"
                className="cursor-pointer"
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-8"
            >
              <div className="text-center min-w-[90px]">
                <div className="text-2xl font-bold text-primary-inactive">
                  10k+
                </div>
                <div className="text-sm text-primary-dark">Active Chatbots</div>
              </div>
              <div className="text-center min-w-[90px]">
                <div className="text-2xl font-bold text-primary-inactive">
                  99.9%
                </div>
                <div className="text-sm text-primary-dark">Uptime</div>
              </div>
              <div className="text-center min-w-[90px]">
                <div className="text-2xl font-bold text-primary-inactive">
                  24/7
                </div>
                <div className="text-sm text-primary-dark">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </Flex>
      </motion.div>
    </Box>
  );
};

export default ChatBot;
