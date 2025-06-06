import React from "react";
import { motion } from "framer-motion";

import { APP_ROUTES } from "@/app/constants/routes";
import { Breadcrumb } from "@/app/components/ui";
import {
  scrollToSection,
  TableOfContentsItem,
  termsContentData,
} from "@/app/utils/resource/utils";

import { useActiveSection } from "@/app/hooks/useActiveSection";
import {
  TableOfContents,
  TermsContent,
} from "@/app/pages/resources/components";

const TermsCondition: React.FC = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Terms & Condition" },
  ];

  // Generate table of contents from content
  const tableOfContentsItems: TableOfContentsItem[] = termsContentData.map(
    (item) => ({
      id: item.id,
      title: item.title,
      level: item.level,
    }),
  );

  // Get content IDs for active section tracking
  const contentIds = termsContentData.map((item) => item.id);
  const activeSection = useActiveSection(contentIds);

  // Handle smooth scrolling to sections
  const handleSectionClick = (sectionId: string): void => {
    scrollToSection(sectionId, 100);
  };

  return (
    <div className="pt-20 px-2 sm:px-4 lg:px-px py-4 md:pb-12">
      {/* Breadcrumb Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-6 md:mb-8"
      >
        <Breadcrumb items={SupportCrumb} />
      </motion.div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 lg:mb-12"
      >
        <h1 className="h2-bold-40 text-base-black">
          Assistant Tech's Terms of Service
        </h1>
        <p className="body-regular-16 text-grey-medium max-w-3xl pt-2">
          Please read these terms and conditions carefully before using our
          services.
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Sidebar - Table of Contents */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="hidden lg:block relative h-full">
            <div className="fixed top-[270px] max-h-[calc(100vh-128px)] overflow-y-auto pr-2">
              <TableOfContents
                items={tableOfContentsItems}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 px-px py-4 lg:px-8 lg:py-8"
          >
            {/* Terms and Condition */}
            <TermsContent content={termsContentData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
