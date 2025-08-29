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
      {/* Background abstract shapes - reduced animation complexity */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-40 -left-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Circle className="w-24 h-24 md:w-24 md:h-24" color="teal" />
        </motion.div>

        <motion.div
          className="absolute -top-10 -right-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <img
            src={logo}
            alt="Logo SVG"
            className="w-24 h-24 md:w-24 md:h-24"
            width="96"
            height="96"
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
          src="https://res.cloudinary.com/dtoqwn0gx/image/upload/v1754284164/dash1_nvbxo9.png"
          srcSet="
            https://res.cloudinary.com/dtoqwn0gx/image/upload/v1754284164/dash1_nvbxo9.png 300w,
          "
          sizes="(max-width: 480px) 100vw, 50vw"
          alt="Dashboard 1"
          width="400"
          height="300"
          loading="eager"
          className="w-full h-auto object-cover shadow-2xl rounded
               hover:shadow-3xl transition-shadow duration-300
               border border-white/20"
        />
      </div>
    </section>
  );
};

export default HeroSection;
