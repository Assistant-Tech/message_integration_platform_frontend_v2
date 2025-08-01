import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const DashboardPreview: React.FC = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  // Simplified scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to lift the dashboard
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, -25, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.8],
  );

  return (
    <div ref={containerRef} className="relative pb-32 bg-primary-light -z-50">
      <div className="relative">
        {/* Reduced number of animated blobs for better performance */}
        <motion.div
          className="absolute w-96 h-96 bg-primary opacity-70 rounded-full blur-xl bottom-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            duration: 2,
            delay: 0.5,
          }}
        />

        {/* Top right mesh blob */}
        <motion.div
          className="absolute w-96 h-96 bg-primary-dark opacity-40 rounded-full blur-3xl bottom-0 right-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{
            duration: 2,
            delay: 1,
          }}
        />

        {/* Center mesh blob */}
        <motion.div
          className="absolute w-80 h-80 bg-primary opacity-30 rounded-full blur-3xl top-[50%] left-2/3 translate(-50%, -50%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{
            duration: 2,
            delay: 1.5,
          }}
        />

        <motion.div
          ref={ref}
          style={{ y, opacity }}
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
          className="relative"
        >
          <figure className="flex justify-center items-center gap-6 px-8">
            {/* Dashboard 1 - Left positioned */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : false}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="relative transform-gpu p-2 border-4 border-base-white rounded-lg"
            >
              <img
                src="https://res.cloudinary.com/dtoqwn0gx/image/upload/w_800/v1753920902/dash1_qvgd1t.png"
                srcSet="
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/w_600/v1753920902/dash1_qvgd1t.png 600w,
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/w_800/v1753920902/dash1_qvgd1t.png 800w,
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/w_1000/v1753920902/dash1_qvgd1t.png 1000w
                "
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                alt="Dashboard 1"
                width="800"
                height="600"
                className="w-4xl h-auto object-cover rounded-2xl shadow-2xl 
                          hover:shadow-3xl transition-shadow duration-300
                          border border-white/20"
              />
            </motion.div>

            {/* Dashboard 2 - Right positioned and overlapping */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: -20, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.6,
              }}
              className="relative transform-gpu -ml-10 mt-8 p-2 border-4 border-base-white rounded-lg"
            >
              <img
                src="https://res.cloudinary.com/dtoqwn0gx/image/upload/w_600/v1753920903/dash2_wuvsmu.webp"
                srcSet="
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/w_400/v1753920903/dash2_wuvsmu.webp 400w,
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/w_600/v1753920903/dash2_wuvsmu.webp 600w,
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/w_800/v1753920903/dash2_wuvsmu.webp 800w
                "
                sizes="(max-width: 768px) 100vw, 40vw"
                alt="Dashboard 2"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="600"
                height="450"
                className="w-lg h-auto object-cover rounded-2xl shadow-2xl 
                          hover:shadow-3xl transition-shadow duration-100
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
