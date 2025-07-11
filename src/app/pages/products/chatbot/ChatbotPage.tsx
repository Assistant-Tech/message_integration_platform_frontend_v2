import React from "react";
import { motion } from "framer-motion";

import { GetStarted, Pricing, SeemlessExperience } from "@/app/pages/landing/";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  SmartSolutions,
  ChatbotHeader,
  ConversationalImpact,
} from "@/app/pages/products/components/";
import ScaleYourBusiness from "../components/ScaleYourBusiness";
import { Breadcrumb } from "@/app/components/ui";
import { FAQ } from "@/app/components/common";
import { OurProcess } from "../../aboutus/components";
import { BotIcon, MessageSquareQuote, MonitorCheck } from "lucide-react";

const ChatbotPage: React.FC = () => {
  const ChatbotBreadCrumbs = [
    { label: "Products", href: APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW },
    { label: "Chatbot" },
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
          <Breadcrumb items={ChatbotBreadCrumbs} />
        </motion.div>

        {/* Chatbot Header */}
        <ChatbotHeader />

        <ConversationalImpact />

        {/* OUR PROCESS */}
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen pb-20">
          <OurProcess
            badgeTitle="IMPLEMENTATION"
            sectionTitle="Steps to Get Your Chatbot Running"
            sectionSubtitle="Launch your intelligent assistant in just a few simple steps. Designed to integrate quickly and scale easily."
            steps={[
              {
                step: 1,
                title: "Click to Chatbot",
                description: "Create a bot or use the existing bot available.",
                icon: BotIcon,
              },
              {
                step: 2,
                title: "Customize Responses",
                description:
                  "Tailor intents, flows, and tone to match your brand voice and goals.",
                icon: MessageSquareQuote,
              },
              {
                step: 3,
                title: "Go Live & Monitor",
                description:
                  "Launch your bot and access real-time analytics to keep improving.",
                icon: MonitorCheck,
              },
            ]}
          />
        </div>

        {/* SCALE YOUR BUSINESS SECTION */}
        <ScaleYourBusiness />

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

export default ChatbotPage;
