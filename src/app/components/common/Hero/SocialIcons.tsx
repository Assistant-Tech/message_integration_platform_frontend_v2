import React from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS_CONFIG } from "@/app/utils/utils";

const SocialIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {SOCIAL_LINKS_CONFIG.map((social, index) => {
        return (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute pointer-events-auto"
            style={{
              top: social.top,
              left: social.left,
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              scale: 0,
              opacity: 0,
              rotate: -180,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.2,
            }}
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer bg-white relative"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                rotate: -10,
              }}
            >
              <img
                src={social.src}
                alt={social.name}
                width={social.size}
                height={social.size}
              />

              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0"
                style={{
                  background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Floating sparkles */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-white/30 rounded-full"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/20 rounded-full"
              animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
