import { cn } from "@/app/utils/cn";
import { SOCIAL_LINKS_CONFIG } from "@/app/utils/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";
import type { FC } from "react";

const Hero: FC = () => {
  const timestamp = useMemo(() => Date.now(), []);

  const renderFloatingBubbles = () => {
    const bubblePositions = [
      // Left bubble
      { left: 10, top: 400 },
      { left: 8, top: 520 },
      { left: 12, top: 650 },
      { left: 18, top: 580 },
      // Right bubble
      { left: 85, top: 380 },
      { left: 90, top: 500 },
      { left: 80, top: 620 },
      { left: 92, top: 680 },
    ];

    return SOCIAL_LINKS_CONFIG.map((social, index) => {
      const { src, color, size, name, href } = social;
      const position = bubblePositions[index];

      if (!position) {
        console.warn(
          `No predefined position for social link at index ${index}. Skipping.`,
        );
        return null;
      }

      const basePosY = position.top;
      const amplitude = 20;
      const posY =
        basePosY + Math.sin(index * 0.2 + timestamp / 8000) * amplitude;
      const delay = index * 0.55;

      return (
        <motion.a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute"
          style={{
            left: `${position.left}%`,
            top: `${posY}px`,
            transform: "translateX(-50%)",
          }}
          aria-label={`Connect on ${name}`}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          whileHover={{ scale: 1.25, zIndex: 20, y: -8 }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-white shadow-xl p-3"
            animate={{ translateY: [0, -10, 0] }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            title={name}
          >
            <img
              src={src}
              alt={`${name} icon`}
              width={size}
              height={size}
              style={{ color }}
              className={cn(name == "WhatsApp" ? "rounded-full" : "")}
            />
          </motion.div>
        </motion.a>
      );
    }).filter(Boolean);
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-teal-50 overflow-hidden pt-20 rounded-4xl">
      <div className="container mx-auto px-4 pt-12 mt-48 pb-32 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="bold-64 font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Talk to All Your Customers in One Place
          </motion.h1>

          <motion.p
            className="h4-regular-24 md:text-xl text-base-black mb-10 mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Just one clean, easy AI powered app to manage all your chats —
            WhatsApp, Instagram, Facebook, Telegram, and more.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-6 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start 14-day Free Trial
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-white text-teal-600 font-medium rounded-md border border-teal-200 hover:border-teal-400 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {renderFloatingBubbles()}
      </div>

      {/* Reserved for Mac section */}
      <div className="h-64 md:h-96"></div>
    </div>
  );
};

export default Hero;
