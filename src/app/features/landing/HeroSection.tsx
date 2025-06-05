import React from "react";
import { motion } from "framer-motion";
import {
  HeroContent,
  DashboardPreview,
  SocialIcons,
} from "@/app/components/common/";
import logo from "@/app/assets/logo.svg";
import { Circle } from "lucide-react";
import dash1 from "@/app/assets/images/dash1.png";
import dash2 from "@/app/assets/images/dash2.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 max-w-[1600px] md:mx-auto sm:mx-6 mx-4 mt-20 px-8 md:px-12 lg:px-32 bg-primary-light rounded-4xl overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div className="absolute -top-20 -left-64">
          <Circle
            className="w-80 h-80 md:w-96 md:h-96 opacity-20"
            color="teal"
          />
        </motion.div>

        <motion.div className="absolute -top-40 -right-30">
          <motion.img
            src={logo}
            alt="Logo SVG"
            className="w-60 h-60 md:w-96 md:h-96 opacity-40"
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

      {/* Bottom dashboard preview (only for md and up) */}
      <div className="relative z-20 -mt-20 hidden md:block">
        <DashboardPreview />
      </div>

      {/* Mobile/tablet image preview (only for smaller than md) */}
      <div className="relative flex md:hidden z-20 -mt-20 px-4">
        <img
          src={dash1}
          alt="Dashboard 1"
          className="w-full h-auto object-cover shadow-2xl rounded
               hover:shadow-3xl transition-shadow duration-300
               border border-white/20"
        />
        <img
          src={dash2}
          alt="Dashboard 1"
          className="w-1/2 h-auto object-cover rounded shadow-2xl 
               hover:shadow-3xl transition-shadow duration-300
               border border-white/20"
        />
      </div>
    </section>
  );
};

export default HeroSection;
