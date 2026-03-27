"use client";

import { motion } from "framer-motion";
import logo from "@/app/assets/white-icons/assist.svg";
import { Circle } from "lucide-react";

const GetStarted = () => {
  return (
    <section className="relative w-full overflow-hidden bg-primary flex items-end justify-center pt-16 md:pt-20 lg:pt-24 pb-0 px-4">
      {/* Background elements */}
      <motion.img
        src={logo}
        alt="Logo SVG"
        className="absolute bottom-0 -left-10 w-72 h-72 md:w-96 md:h-96 opacity-30"
        initial={{ rotate: 180, scale: 1 }}
        animate={{ rotate: [90, 190, 170, 180], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="absolute -top-10 -right-10">
        <Circle
          className="w-28 h-28 md:w-40 md:h-40 opacity-20"
          color="white"
        />
      </motion.div>

      {/* Blurry blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-custom-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 right-1/4 w-36 h-36 md:w-52 md:h-52 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1600px] w-full flex flex-col-reverse md:flex-row items-end justify-between gap-12 md:gap-20 lg:gap-32 px-4 md:px-8 lg:px-2">
        {/* Left Text Section */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 pb-10 md:pb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-snug">
            Get Started with Chatblix today.
          </h2>
          <p className="text-base md:text-lg text-gray-200 max-w-md">
            Try Chatblix free for 14 days and discover how it can transform
            your workflow!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-white text-primary-dark font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-grey-light transition"
          >
            Start 14-day Free Trial
          </motion.button>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg border-4 md:border-8 border-white rounded-2xl md:rounded-3xl overflow-hidden transform -rotate-1 md:-rotate-3 shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920901/getstarted_juzd3p.png"
            alt="Chatblix Dashboard Mockup"
            className="w-full h-auto object-contain rounded-xl md:rounded-2xl animate-float relative bottom-0"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;
