import { useState } from "react";
import { footerLinks, SocialFooter } from "@/app/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Logo, StoreButtons } from "@/app/components/ui";
import { ChevronDown } from "lucide-react";
import play from "@/app/assets/icons/play.svg";
import app from "@/app/assets/icons/app.svg";

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
const storeLinks = [
  { img: app, label: "App Store" },
  { img: play, label: "Google Play" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer
      className="bg-primary-light pt-10 w-full sticky"
      id="footer-observer"
    >
      <div>
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-40 w-full max-w-[1600px] mx-auto px-6">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center pb-4"
            >
              <Logo />
            </motion.div>

            <p className="body-bold-16 pb-4 text-grey">
              Let's Make Customer Conversations Simple
            </p>

            {/* Store Buttons */}
            <div className="flex flex-col gap-2 w-48 pb-6">
              <StoreButtons stores={storeLinks} />
            </div>
          </div>

          {/* Footer Links */}
          <div className="w-full">
            {/* Mobile/Tablet Dropdowns */}
            <div className="lg:hidden space-y-6 px-4 py-2">
              {["products", "resources", "pricing", "contact"].map(
                (section) => (
                  <div key={section}>
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex justify-between items-center py-2 h4-bold-16 border-b border-gray-300"
                    >
                      <span className="capitalize">{section}</span>
                      <ChevronDown
                        className={`transition-transform ${
                          openSection === section ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openSection === section && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-2 py-2 space-y-2"
                        >
                          {footerLinks[section as keyof typeof footerLinks].map(
                            (link, index: number) => {
                              const isContactSection = section === "contact";
                              return (
                                <li key={index}>
                                  <a
                                    href={link.url}
                                    className="text-grey transition-colors flex items-center text-sm"
                                  >
                                    {isContactSection &&
                                      "icon" in link &&
                                      link.icon && (
                                        <link.icon className="mr-2" />
                                      )}
                                    {link.name}
                                  </a>
                                </li>
                              );
                            },
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ),
              )}
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 gap-10">
              {["products", "resources", "pricing", "contact"].map(
                (section) => (
                  <motion.nav
                    key={section}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    aria-label={section}
                  >
                    <h3 className="body-bold-16 capitalize text-base-black mb-4">
                      {section}
                    </h3>
                    <ul className="space-y-4">
                      {footerLinks[section as keyof typeof footerLinks].map(
                        (link, index: number) => (
                          <li key={index}>
                            <a
                              href={link.url}
                              className="text-grey-medium hover:text-grey transition-colors flex items-center h5-regular-16"
                            >
                              {"icon" in link && link.icon && (
                                <link.icon className="mr-2" />
                              )}
                              {link.name}
                            </a>
                          </li>
                        ),
                      )}
                    </ul>
                  </motion.nav>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="bg-primary text-white">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-6 px-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h5-bold-16"
            >
              &copy; {currentYear} Assistant Tech. All Rights Reserved.
            </motion.p>

            {/* Social */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex gap-6"
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
                      alt={`${item.name} icon`}
                      className="w-6 h-6 "
                    />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
