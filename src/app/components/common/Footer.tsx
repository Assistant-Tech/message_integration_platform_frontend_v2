import { footerLinks, SocialFooter } from "@/app/utils/utils";
import { motion } from "framer-motion";
import { Logo } from "@/app/components/ui";
import play from "@/app/assets/icons/play.svg";
import app from "@/app/assets/icons/app.svg";
import * as Separator from "@radix-ui/react-separator";

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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-light text-black border-t border-white/20 py-10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-2">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-36 w-full">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Logo />
            </motion.div>

            <p className="body-bold-16 max-w-xs">
              "Let's Make Customer Conversations Simple"
            </p>

            {/* Store Buttons */}
            <div className="flex flex-col gap-2 w-48 py-12">
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
          {/* Footer Links Grid */}
          {/* add drop down */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {["products", "resources", "pricing", "contact"].map((section) => (
              <motion.nav
                key={section}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                aria-label={section}
              >
                <h3 className="body-bold-16 capitalize mb-4">{section}</h3>
                <ul className="space-y-4">
                  {(footerLinks as any)[section].map(
                    (link: any, index: number) => (
                      <motion.li key={index} variants={itemVariants}>
                        <a
                          href={link.url}
                          className="hover:text-primary-inactive transition-colors flex items-center h4-regular-16"
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
              </motion.nav>
            ))}
          </div>
        </div>

        {/* Divider */}
        <Separator.Root decorative className="w-full h-px bg-border mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
                    alt={`${item.name} icon`}
                    className="w-6 h-6 bg-white rounded-full p-1"
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
            className="flex space-x-6 body-regular-16"
          >
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
