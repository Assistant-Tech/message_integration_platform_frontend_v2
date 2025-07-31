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
    <section
      className="relative z-10 mt-20 bg-primary-light rounded-4xl overflow-hidden"
      id="hero"
    >
      {/* Background abstract shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div className="absolute top-40 -left-14">
          <Circle
            className="w-24 h-24 md:w-24 md:h-24 opacity-40"
            color="teal"
          />
        </motion.div>

        <motion.div className="absolute -top-10 -right-10">
          <motion.img
            src={logo}
            alt="Logo SVG"
            className="w-24 h-24 md:w-24 md:h-24 opacity-40"
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
      <div className="relative pt-10 md:pt-16 pb-32">
        <SocialIcons />
        <div className="text-center max-w-5xl mx-auto">
          <HeroContent />
        </div>
      </div>

      {/* Bottom dashboard preview (only for md and up) */}
      <div className="relative -mt-20 hidden md:block">
        <DashboardPreview />
      </div>

      {/* Mobile/tablet image preview (only for smaller than md) */}
      <div className="relative flex md:hidden z-10 -mt-20 px-4">
        <img
          src={
            "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920902/dash1_qvgd1t.png"
          }
          alt="Dashboard 1"
          className="w-full h-auto object-cover shadow-2xl rounded
               hover:shadow-3xl transition-shadow duration-300
               border border-white/20"
        />
        <img
          src={
            "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920903/dash2_wuvsmu.webp"
          }
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
