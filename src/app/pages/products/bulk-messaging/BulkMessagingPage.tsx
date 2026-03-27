import React from "react";
import { motion } from "framer-motion";

import { GetStarted, Pricing, SeemlessExperience } from "@/app/pages/landing/";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  SmartSolutions,
  BulkMessageHeader,
} from "@/app/pages/products/components/";
import ScaleYourBusiness from "../components/ScaleYourBusiness";
import { Breadcrumb } from "@/app/components/ui";
import { FAQ } from "@/app/components/common";

const BulkMessagingPage: React.FC = () => {
  const UnifiedMessageBreadCrumbs = [
    { label: "Products", href: APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW },
    { label: "Bulk Messaging Clients" },
  ];

  return (
    <div className="bg-white mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 lg:px-px">
      <div>
        {/* Breadcrumb Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <Breadcrumb items={UnifiedMessageBreadCrumbs} />
        </motion.div>

        {/* Chatbot Header */}
        <BulkMessageHeader />

        {/* SCALE YOUR BUSINESS SECTION */}

        <ScaleYourBusiness />

        {/* LEARN MORE ABOUT CRM SECTION */}
        {/* <LearnMoreCRM /> */}

        {/* GET STARTED */}
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
          <GetStarted />
        </div>

        {/* SMART SOLUTION BUSINES */}
        <SmartSolutions />

        {/* SEEMLESS EXPERIENCE */}
        <SeemlessExperience />

        {/* PRICING SECTION */}
        <Pricing />

        {/* FAQ SECTION */}
        <FAQ variant="default" />
      </div>
    </div>
  );
};

export default BulkMessagingPage;
