import { footerLinks, SocialFooter } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/app/components/ui";
import play from "@/app/assets/icons/play.svg";
import app from "@/app/assets/icons/app.svg";

// import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className=" border-t border-white ">
      <div className="max-w-full w-full mx-auto ">
        {/* Main footer content */}
        <div className="bg-primary-light text-base-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 px-4 py-8 sm:px-6 lg:px-8 ">
          {/* Company logo and info */}
          <div className="lg:col-span-1 ">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4"
            >
              <Logo />
            </motion.div>
            <p className="text-sm mb-4">
              Let's Make Customer Conversations Simple
            </p>
            <div className="flex flex-col gap-2 w-48 cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 h-14"
              >
                <img src={app} alt="" />
                <div className="flex flex-col">
                  <span>Available on the</span>
                  <span className="ml-1 font-bold">App Store</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 h-14"
              >
                <img src={play} alt="" />
                <div className="flex flex-col">
                  <span>Available on the</span>
                  <span className="ml-1 font-bold">Google Play</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Products */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={isMobile ? "mt-4" : ""}
          >
            <h3 className="label-bold-14 mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <a
                    href={link.url}
                    className="label-regular-14 hover:text-primary-inactive "
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h3 className="label-bold-14 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <a
                    href={link.url}
                    className="label-regular-14 hover:text-primary-inactive "
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h3 className="label-bold-14 mb-4">Pricing</h3>
            <ul className="space-y-2">
              {footerLinks.pricing.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <a
                    href={link.url}
                    className="label-regular-14 hover:text-primary-inactive "
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h3 className="label-bold-14 mb-4">Contact Us</h3>
            <ul className="space-y-2 label-regular-14">
              {footerLinks.contact.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <a href={link.url} className="flex items-center">
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 border-t border-white/30 bg-primary px-4 py-8 sm:px-6 lg:px-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h5-bold-16 text-center md:text-left text-white "
            >
              &copy; {currentYear} Assistant Tech. All Rights Reserved
            </motion.p>

            {/* Social Media Icons */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex justify-center items-center gap-4 my-4 md:my-0"
            >
              {SocialFooter.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <a href={item.href}>
                    <img
                      src={item.src}
                      className="w-6 h-6 bg-white rounded-full p-1"
                      alt={`${item.name} icon`}
                    />
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex space-x-6 text-white"
            >
              <a href="#" className="h5-regular-16 ">
                Privacy Policy
              </a>
              <a href="#" className="h5-regular-16 ">
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
