import { cn } from "@/app/utils/cn";
import { SOCIAL_LINKS_CONFIG } from "@/app/utils/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import dash from "@/app/assets/images/dash.png";

const Hero = () => {
  const timestamp = useMemo(() => Date.now(), []);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const dashboardY = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

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
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
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
    <section className="max-w-[1600px] mx-auto">
      <div
        ref={containerRef}
        className="relative bg-primary-light overflow-hidden pt-20 rounded-4xl mt-24 "
      >
        <div className="container relative mx-auto px-4 pt-24 pb-32 z-10">
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
                className="px-6 py-3 bg-primary text-white body-bold-16 rounded-md hover:bg-primary-dark transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start 14-day Free Trial
              </motion.button>

              <motion.button
                className="px-6 py-3 bg-white text-primary font-medium rounded-md border border-primary hover:border-primary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Dashboard image that appears on scroll */}
        <motion.div
          className="absolute left-0 right-0 mx-auto w-full max-w-5xl bottom-0 z-20 px-4 md:px-8"
          style={{
            y: dashboardY,
            scale: dashboardScale,
            opacity: dashboardOpacity,
          }}
        >
          <div className="relative w-full shadow-2xl rounded-t-2xl overflow-hidden">
            <img
              src={dash}
              alt="Dashboard Interface"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {renderFloatingBubbles()}
        </div>

        {/* Reserved for Mac section */}
        <div className="h-64 md:h-96"></div>
      </div>
    </section>
  );
};

export default Hero;
