import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  DASHBOARD_IMAGE_URL,
  DASHBOARD_IMAGE_URL_2,
} from "@/app/constants/image-cloudinary";

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
    <div ref={containerRef} className="relative pb-32 -z-50">
      <div className="relative">
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
                src={DASHBOARD_IMAGE_URL}
                srcSet="
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/v1765931633/dashboard2_taupix.png 600w,
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
                src={DASHBOARD_IMAGE_URL_2}
                srcSet="
                  https://res.cloudinary.com/dtoqwn0gx/image/upload/v1765931633/dashboard_dn71id.png 600w,
                "
                sizes="(max-width: 768px) 100vw, 40vw"
                alt="Dashboard 2"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="600"
                height="550"
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
