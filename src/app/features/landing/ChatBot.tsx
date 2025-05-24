"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Flex } from "@radix-ui/themes";
import { AnimatedProcessCard } from "@/app/components/animations/";
import createbot from "@/app/assets/images/createbot.png";
import { Button } from "@/app/components/ui";

const ChatBot: React.FC = () => {
  const processes = [
    "Chatbot Process One",
    "Chatbot Process Two",
    "Chatbot Process Three",
    "Chatbot Process Four",
  ];

  return (
    <Box className="min-h-auto w-full max-w-[1600px] mx-auto px-4 md:px-8 py-16">
      <Flex
        direction={{ initial: "column", lg: "row" }}
        align="center"
        justify="between"
        className="container relative gap-16 px-4 md:px-32"
      >
        {/* Left Section with Image and Animated Cards */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-2xl"
        >
          {/* Animated Cards - always positioned left of image */}
          <div className="absolute left-0 top-16 -translate-y-1/2 z-10">
            <AnimatedProcessCard processes={processes} />
          </div>

          <figure className="relative">
            <img
              src={createbot}
              alt="Create Bot"
              className="w-full sm:h-[553px] h-[289px] object-contain"
            />
          </figure>
        </motion.div>

        {/* Right Section with Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full space-y-6 max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary-light text-secondary px-4 py-2 rounded-full h5-italic-bold-16 inline-block"
          >
            AI DRIVEN CHATBOTS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h2-bold-40 text-grey"
          >
            Create Your Chatbots in Minutes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Create chatbots for sales, support, and more. Build intelligent
            conversational experiences that engage your customers 24/7 with our
            powerful AI platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-8 pt-8 flex-wrap"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-inactive">
                10k+
              </div>
              <div className="text-sm text-primary-dark">Active Chatbots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-inactive">
                99.9%
              </div>
              <div className="text-sm text-primary-dark">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-inactive">
                24/7
              </div>
              <div className="text-sm text-primary-dark">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default ChatBot;
