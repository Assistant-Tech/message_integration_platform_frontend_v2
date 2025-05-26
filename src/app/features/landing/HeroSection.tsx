import React from "react";
import { motion } from "framer-motion";
import {
  HeroContent,
  DashboardPreview,
  SocialIcons,
} from "@/app/components/common/";
import logo from "@/app/assets/logo.svg";
import { Circle } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 max-w-[1600px] mx-auto mt-20 px-4 md:px-12 lg:px-32 bg-primary-light rounded-4xl overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div className="absolute -top-20 -left-64">
          <Circle className="w-96 h-96 opacity-20" color="teal" />
        </motion.div>

        <motion.div className="absolute -top-40 -right-30">
          <motion.img
            src={logo}
            alt="Logo SVG"
            className="w-96 h-96 opacity-40"
            initial={{ rotate: 180, scale: 1 }}
            animate={{
              rotate: [180, 190, 170, 180],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Top section content */}
      <div className="relative pt-10 md:pt-16 pb-32 z-30">
        <SocialIcons />
        <div className="text-center max-w-5xl mx-auto">
          <HeroContent />
        </div>
      </div>

      {/* Bottom dashboard preview */}
      <div className="relative z-20 -mt-20">
        <DashboardPreview />
      </div>
    </section>
  );
};

export default HeroSection;
