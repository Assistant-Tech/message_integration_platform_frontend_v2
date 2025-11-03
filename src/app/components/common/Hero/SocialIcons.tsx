import React from "react";
import { motion } from "framer-motion";

export const SOCIAL_LINKS_CONFIG_SVG = [
  {
    name: "Facebook",
    href: "https://facebook.com/yourprofile",
    color: "#1877F2",
    size: 42,
    mobileSize: 30,
    top: "46%",
    left: "85%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12H17l-.4 3h-2.6v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourprofile",
    color: "#E4405F",
    size: 36,
    mobileSize: 26,
    top: "15%",
    left: "90%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-2.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/yourusername",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "58%",
    left: "75%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.36 2H21l-6.47 7.39L21.93 22h-5.69l-4.46-6.41L6.62 22H3.97l6.9-7.88L2.4 2h5.83l4.03 5.87L18.36 2z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/yourusername",
    color: "#0088cc",
    size: 42,
    mobileSize: 30,
    top: "38%",
    left: "21%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.04 14.56 8.9 18c.39 0 .56-.17.77-.38l1.86-1.78 3.85 2.82c.71.39 1.22.18 1.41-.66l2.56-12.02c.23-1.08-.39-1.5-1.1-1.23L2.89 9.25c-1.06.42-1.04 1.02-.18 1.28l4.91 1.53 7.37-4.65c.35-.21.68-.09.42.12l-6.37 6.03z" />
      </svg>
    ),
  },
  {
    name: "Tiktok",
    href: "https://tiktok.com",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "19%",
    left: "10%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2h2.4c.1 1.2.5 2.3 1.1 3.2a5.3 5.3 0 0 0 2.9 2V9a7.3 7.3 0 0 1-4-1.2v7.1a5.9 5.9 0 1 1-5.9-5.9v2.4a3.5 3.5 0 1 0 3.5 3.5V2z" />
      </svg>
    ),
  },
  {
    name: "Viber",
    href: "https://viber.com",
    color: "#7360F2",
    size: 28,
    mobileSize: 20,
    top: "75%",
    left: "29%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 2h-11C4 2 2 4 2 6.5v11C2 19.9 4 22 6.5 22H7v2.2c0 .5.5.8 1 .5L11.4 22h6.1c2.5 0 4.5-2.1 4.5-4.5v-11C22 4 20 2 17.5 2zM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm3-6a3 3 0 0 0-3-3v1a2 2 0 0 1 2 2h1z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
    mobileSize: 32,
    top: "65%",
    left: "5%",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.47 14.37c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.85 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.83-2.01-.22-.54-.44-.47-.61-.48h-.52c-.18 0-.48.07-.73.34s-.96.94-.96 2.28.98 2.64 1.12 2.83c.14.18 1.93 2.95 4.68 4.04.65.28 1.16.45 1.56.57.65.21 1.24.18 1.7.11.52-.08 1.6-.65 1.83-1.27.23-.62.23-1.15.16-1.27-.07-.11-.25-.18-.52-.32z" />
      </svg>
    ),
  },
];

const SocialIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      {SOCIAL_LINKS_CONFIG_SVG.map((social, index) => (
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
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.2,
          }}
        >
          <motion.div
            className="w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer bg-white relative md:opacity-90 sm:opacity-30 opacity-50"
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
            {/* Inline SVG tag */}
            <svg
              viewBox="0 0 24 24"
              fill={social.color}
              style={{
                width: `clamp(${social.mobileSize}px, 4vw, ${social.size}px)`,
                height: `clamp(${social.mobileSize}px, 4vw, ${social.size}px)`,
              }}
              className="w-full h-full object-contain"
            >
              {social.svg.props.children}
            </svg>

            {/* Glow */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
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
      ))}
    </div>
  );
};

export default SocialIcons;
