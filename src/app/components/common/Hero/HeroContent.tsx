import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";
import landing from "@/app/content/json/landing.json";

const { hero } = landing;

const HeroContent: React.FC = () => {
  return (
    <div className="text-center space-y-4 pt-16 z-auto">
      <motion.h1
        className="bold-64 text-base-black pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {hero.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h4-regular-24 text-base-black mb-4 mx-auto"
      >
        {hero.subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-2 md:space-y-0 pt-6"
      >
        <Button
          label="Start 14-days Free Trial"
          variant="primary"
          className="w-56 button-semi-bold-16 px-4 py-3"
        />
        <Button
          label="Book a Demo"
          variant="outlined"
          className="w-56 button-semi-bold-16 px-4 py-3"
        />
      </motion.div>
    </div>
  );
};

export default HeroContent;
