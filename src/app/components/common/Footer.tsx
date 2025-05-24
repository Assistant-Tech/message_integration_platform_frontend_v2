"use client";

import { footerLinks, SocialFooter } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/app/components/ui";
import play from "@/app/assets/icons/play.svg";
import app from "@/app/assets/icons/app.svg";
import * as Separator from "@radix-ui/react-separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="border-t border-white bg-primary-light">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1600px]">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 text-black">
            {/* Brand */}
            <div className="lg:col-span-1 px-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center mb-4"
              >
                <Logo />
              </motion.div>
              <p className="body-bold-16 mb-4 text-grey-medium">
                "Let's Make Customer Conversations Simple"
              </p>
              <div className="flex flex-col gap-2 w-48">
                {[
                  { img: app, label: "App Store" },
                  { img: play, label: "Google Play" },
                ].map((store, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 h-14 cursor-pointer"
                  >
                    <img src={store.img} alt="" />
                    <div className="flex flex-col">
                      <span>Available on the</span>
                      <span className="ml-1 font-bold">{store.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Link Sections */}
            {["products", "resources", "pricing", "contact"].map(
              (section, idx) => (
                <motion.div
                  key={section}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className={isMobile && idx === 0 ? "mt-4" : ""}
                >
                  <h3 className="label-bold-14 mb-4 capitalize">{section}</h3>
                  <ul className="space-y-2">
                    {(footerLinks as any)[section].map(
                      (link: any, index: number) => (
                        <motion.li key={index} variants={itemVariants}>
                          <a
                            href={link.url}
                            className="label-regular-14 hover:text-primary-inactive flex items-center"
                          >
                            {link.icon && (
                              <span className="mr-2">{link.icon}</span>
                            )}
                            {link.name}
                          </a>
                        </motion.li>
                      ),
                    )}
                  </ul>
                </motion.div>
              ),
            )}
          </div>

          {/* Separator */}
          <Separator.Root decorative className="h-px bg-white/30 w-full mb-6" />

          {/* Bottom Section */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h5-bold-16 text-primary text-center md:text-left"
            >
              &copy; {currentYear} Assistant Tech. All Rights Reserved
            </motion.p>

            {/* Social Icons */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex gap-4"
            >
              {SocialFooter.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <a href={item.href} aria-label={item.name}>
                    <img
                      src={item.src}
                      className="w-6 h-6 bg-white rounded-full p-1"
                      alt={`${item.name} icon`}
                    />
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex space-x-6 text-primary"
            >
              <a href="#" className="h5-regular-16">
                Privacy Policy
              </a>
              <a href="#" className="h5-regular-16">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
