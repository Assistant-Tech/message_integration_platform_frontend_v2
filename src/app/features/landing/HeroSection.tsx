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
    <section className="max-w-[1600px] mx-auto relative z-10 px-32 bg-primary-light mt-20 rounded-4xl overflow-hidden">
      <div className="relative pt-4 pb-40 mt-24 ">
        <div className="absolute w-full">
          {/* Logo in top right (half submerged) */}
          <div className="z-40 w-96 h-96 ">
            <motion.div className="absolute -top-20 -left-96">
              <Circle className="w-96 h-96 opacity-20" color="teal" />
            </motion.div>
            <div className="absolute -top-80 -right-40">
              <motion.img
                src={logo}
                alt="logo/svg"
                className="w-96 h-96 opacity-40 "
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
            </div>
          </div>
        </div>
        <SocialIcons />

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto h-full">
          <HeroContent />
        </div>
      </div>

      {/* Submerged Dashboard - positioned to overlap the hero section */}
      <div className="relative z-20">
        <DashboardPreview />
      </div>
    </section>
  );
};

export default HeroSection;
