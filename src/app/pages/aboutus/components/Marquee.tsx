import { motion } from "framer-motion";
import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed = 50 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-50 py-8">
      <motion.div
        className="inline-block"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
