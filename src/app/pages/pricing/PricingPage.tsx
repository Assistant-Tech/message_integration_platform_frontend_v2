import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { Navbar, Footer } from "@/app/components/common";
import Section from "@/app/components/layout/Section";
import { Breadcrumb } from "@/app/components/ui";

import { APP_ROUTES } from "@/app/constants/routes";

// Lazy loaded
const FAQ = lazy(() => import("@/app/pages/landing/FAQ"));
const GetStarted = lazy(() => import("@/app/pages/landing/GetStarted"));
const Pricing = lazy(() => import("@/app/pages/landing/Pricing"));

const PricingPage = () => {
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
  const Price = [
    { label: "Home", href: APP_ROUTES.PUBLIC.HOME },
    { label: "Pricing" },
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
            <Breadcrumb items={Price} />
          </motion.div>
        </div>
      ),
    },
    {
      element: (
        <div className="max-w-full gap-16 items-center w-full">
          <motion.div className="flex justify-between items-center">
            <motion.h2
              variants={itemVariants}
              className="h3-bold-32 text-grey max-w-2xl"
            >
              Discover Plans For You
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="h5-regular-16 text-grey-medium max-w-4xl"
            >
              Whether you're just starting out or ready to scale, we have a plan
              designed to fit your goals. Choose the one that works best for you
              and get started.
            </motion.p>
          </motion.div>
        </div>
      ),
    },
    {
      element: (
        <Suspense fallback={<div>Loading FAQ...</div>}>
          <div className="py-20">
            <Pricing />
          </div>
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
        <Suspense fallback={<div>Loading FAQ...</div>}>
          <FAQ />
        </Suspense>
      ),
    },
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

export default PricingPage;
