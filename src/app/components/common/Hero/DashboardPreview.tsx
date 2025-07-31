import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const DashboardPreview: React.FC = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to lift the dashboard
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [150, -50, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.8],
  );

  return (
    <div
      ref={containerRef}
      className="relative pb-32 bg-primary-light -z-50"
    >
      <div className="relative">
        <motion.div
          className="absolute w-96 h-96 bg-primary opacity-70 rounded-full blur-3xl bottom-0 left-0"
          initial={{ x: "-10%", y: "-10%" }}
          animate={{
            x: ["-10%", "-5%", "-15%", "-10%"],
            y: ["-10%", "-15%", "-5%", "-10%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top right mesh blob */}
        <motion.div
          className="absolute w-96 h-96 bg-primary-dark opacity-40 rounded-full blur-3xl bottom-0 right-10"
          initial={{ x: "0%", y: "10%" }}
          animate={{
            x: ["0%", "5%", "-5%", "0%"],
            y: ["10%", "5%", "15%", "10%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Center right mesh blob */}
        <motion.div
          className="absolute w-96 h-96 bg-primary-dark opacity-40 rounded-full blur-3xl  bottom-[50%] right-0"
          initial={{ x: "20%", y: "0%" }}
          animate={{
            x: ["20%", "25%", "15%", "20%"],
            y: ["0%", "-5%", "5%", "0%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Center mesh blob */}
        <motion.div
          className="absolute w-80 h-80 bg-primary opacity-30 rounded-full blur-3xl  top-[50%] left-2/3 translate(-50%, -50%)"
          initial={{ x: "0%", y: "0%" }}
          animate={{
            x: ["0%", "10%", "-10%", "0%"],
            y: ["0%", "-5%", "5%", "0%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Bottom left mesh blob */}
        <motion.div
          className="absolute w-96 h-96 bg-primary-inactive opacity-40 rounded-full blur-3xl  left-0 bottom-0"
          initial={{ x: "25%", y: "-10%" }}
          animate={{
            x: ["25%", "40%", "20%", "25%"],
            y: ["-10%", "-5%", "-15%", "-10%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Bottom center mesh blob */}
        <motion.div
          className="absolute w-96 h-96 bg-primary-inactive opacity-40 rounded-full blur-3xl overflow-hiddn"
          initial={{ x: "5%", y: "0%" }}
          animate={{
            x: ["5%", "10%", "0%", "5%"],
            y: ["0%", "5%", "-5%", "0%"],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ left: "40%", bottom: "0%" }}
        />

        {/* Bottom right mesh blob */}
        <motion.div
          className="absolute w-80 h-80 bg-primary opacity-35 rounded-full blur-3xl "
          initial={{ x: "-5%", y: "5%" }}
          animate={{
            x: ["-5%", "0%", "-10%", "-5%"],
            y: ["5%", "10%", "0%", "5%"],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          style={{ right: "10%", bottom: "0%" }}
        />
        <motion.div
          ref={ref}
          style={{ y, scale, opacity }}
          initial={{ y: 200, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
          className="relative"
        >
          <figure className="flex justify-center items-center gap-6 px-8">
            {/* Dashboard 1 - Left positioned */}
            <motion.div
              initial={{ x: -100, opacity: 0, rotateY: 15 }}
              animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="relative transform-gpu p-2 border-4 border-base-white rounded-lg"
            >
              <img
                src={
                  "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920902/dash1_qvgd1t.png"
                }
                loading="lazy"
                decoding="async"
                fetchPriority="high"
                alt="Dashboard 1"
                className="w-4xl h-auto object-cover rounded-2xl shadow-2xl 
                          hover:shadow-3xl transition-shadow duration-300
                          border border-white/20"
              />
            </motion.div>

            {/* Dashboard 2 - Right positioned and overlapping */}
            <motion.div
              initial={{ x: 100, opacity: 0, rotateY: -15 }}
              animate={isInView ? { x: -20, opacity: 1, rotateY: 0 } : {}}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.6,
              }}
              className="relative transform-gpu -ml-10 mt-8 p-2 border-4 border-base-white rounded-lg"
            >
              <img
                src={
                  "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920903/dash2_wuvsmu.webp"
                }
                alt="Dashboard 2"
                loading="lazy"
                decoding="async"
                fetchPriority="high"
                className="w-lg h-auto object-cover rounded-2xl shadow-2xl 
                          hover:shadow-3xl transition-shadow duration-300
                          border border-white/20"
              />
            </motion.div>
          </figure>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPreview;
