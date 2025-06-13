import { Suspense, lazy } from "react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { Navbar, Footer, NewsLetter } from "@/app/components/common";
import Section from "@/app/components/layout/Section";
import { Breadcrumb } from "@/app/components/ui";
import {
  CompanyLogo,
  ImageGrid,
  Marquee,
  OurProcess,
  OurTeam,
  WhatWeOffer,
} from "@/app/pages/aboutus/components";

import { APP_ROUTES } from "@/app/constants/routes";
import { companies, features } from "@/app/utils/utils";
import clock from "@/app/assets/greenIcons/clock.svg";
import essentials from "@/app/assets/greenIcons/essentials.svg";

// Lazy loaded
const FAQ = lazy(() => import("@/app/pages/landing/FAQ"));
const GetStarted = lazy(() => import("@/app/pages/landing/GetStarted"));
const Testimonials = lazy(() => import("@/app/pages/landing/Testimonials"));

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";

const About = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const AboutCrumb = [
    { label: "Home", href: APP_ROUTES.PUBLIC.HOME },
    { label: "About Us" },
  ];

  const sections = [
    {
      element: (
        <div className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <Breadcrumb items={AboutCrumb} />
          </motion.div>
        </div>
      ),
    },
    {
      element: (
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full ">
          {/* Left */}
          <motion.div variants={itemVariants} className="space-y-8 max-w-xl">
            <motion.h2 variants={itemVariants} className="h3-bold-32 text-grey">
              Talk to All Your Customers in One Place
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="h5-regular-16 text-grey-medium"
            >
              Just one clean, easy AI powered app to manage all your chats —
              WhatsApp, Instagram, Facebook, Telegram, and more.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-primary-light rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="body-regular-16 text-grey-medium">{feature}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
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
              variants={itemVariants}
              className="flex flex-wrap gap-8"
            >
              <div className="flex items-center space-x-2">
                <img src={clock} alt="clock icon" className="w-8 h-8" />
                <span className="text-primary font-semibold">
                  Round the Clock Reliability
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={essentials}
                  alt="essentials icon"
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
      ),
    },
    {
      element: (
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen py-10">
          <Marquee speed={30}>
            <div className="flex">
              {companies.map((company, index) => (
                <CompanyLogo key={index} name={company} index={index} />
              ))}
              {companies.map((company, index) => (
                <CompanyLogo
                  key={`dupe-${index}`}
                  name={company}
                  index={index}
                />
              ))}
            </div>
          </Marquee>
        </div>
      ),
      useContainer: false,
    },
    { element: <WhatWeOffer /> },
    {
      element: (
        <Suspense fallback={<div>Loading Testimonials...</div>}>
          <OurProcess />
        </Suspense>
      ),
      useContainer: false,
    },
    {
      element: (
        <Suspense fallback={<div>Loading FAQ...</div>}>
          <FAQ />
        </Suspense>
      ),
    },
    {
      element: (
        <Suspense fallback={<div>Loading Get Started...</div>}>
          <GetStarted />
        </Suspense>
      ),
      useContainer: false,
    },
    {
      element: (
        <Suspense fallback={<div>Loading Get Started...</div>}>
          <OurTeam />
        </Suspense>
      ),
      useContainer: false,
    },
    {
      element: (
        <Suspense fallback={<div>Loading Testimonials...</div>}>
          <Testimonials />
        </Suspense>
      ),
      useContainer: false,
    },
    { element: <NewsLetter /> },
    { element: <Footer />, useContainer: false },
  ];

  return (
    <div className="min-h-screen pt-20">
      <Theme>
        <Navbar />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map(({ element, useContainer = true }, idx) => (
            <Section key={idx} useContainer={useContainer}>
              {element}
            </Section>
          ))}
        </motion.div>
      </Theme>
    </div>
  );
};

export default About;
