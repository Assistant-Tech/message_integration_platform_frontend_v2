import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CompanyLogo, ImageGrid, Marquee } from "./components";
import { Button } from "@/app/components/ui";
import { Navbar } from "@/app/components/common";
import Section from "@/app/components/layout/Section";

import clock from "@/app/assets/greenIcons/clock.svg";
import essentials from "@/app/assets/greenIcons/essentials.svg";
import { companies, features } from "@/app/utils/utils";

const AboutUs: React.FC = () => {
  return (
    <Section>
      <div className="min-h-screen bg-white">
        <Navbar />
        {/* Main About Section */}
        <div className="px-2 lg:px-px pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 max-w-xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h2-bold-40 text-base-black "
              >
                About Us
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="h3-bold-32 text-grey"
              >
                Talk to All Your Customers in One Place
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="h5-reulgar-16 text-grey-medium"
              >
                Just one clean, easy AI powered app to manage all your chats —
                WhatsApp, Instagram, Facebook, Telegram, and more.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-light rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="body-regular-16 text-grey-medium">
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col lg:flex-row gap-4"
              >
                <Button
                  label="Start 14-days Free Trial"
                  variant="primary"
                  className="w-56 button-semi-bold-16 px-4 py-3"
                />
                <Button
                  label="Book a Demo"
                  variant="outlined"
                  className="w-56 button-semi-bold-16 px-4 py-3"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-wrap gap-8"
              >
                <div className="flex items-center space-x-2">
                  <img src={clock} alt="round_clock.svg" className="w-8 h-8" />
                  <span className="text-primary font-semibold">
                    Round the Clock Reliability
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={essentials}
                    alt="essentials.svg"
                    className="w-8 h-8"
                  />
                  <span className="text-primary font-semibold">
                    All Essential Solutions
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end items-center max-w-full"
            >
              <ImageGrid />
            </motion.div>
          </div>
        </div>

        {/* Marquee Section */}
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen py-10">
          <Marquee speed={30}>
            <div className="flex">
              {companies.map((company, index) => (
                <CompanyLogo key={index} name={company} index={index} />
              ))}
              {/* Duplicate for seamless loop */}
              {companies.map((company, index) => (
                <CompanyLogo
                  key={`duplicate-${index}`}
                  name={company}
                  index={index}
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </Section>
  );
};

export default AboutUs;
