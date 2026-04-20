import React from "react";
import { motion } from "framer-motion";
import { APP_ROUTES } from "@/app/constants/routes";
import { Breadcrumb } from "@/app/components/ui";
import {
  scrollToSection,
  TableOfContentsItem,
  termsContentData,
} from "@/app/utils/resource/resource.config";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { TermsContent } from "@/app/pages/resources/components";
import { StickyTOCLayout } from "@/app/pages/resources/components/";
import { Shield, CheckCircle2 } from "lucide-react";

const TermsCondition: React.FC = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Terms & Condition" },
  ];

  const tableOfContentsItems: TableOfContentsItem[] = termsContentData.map(
    (item) => ({
      id: item.id,
      title: item.title,
      level: item.level,
    }),
  );

  const contentIds = termsContentData.map((item) => item.id);
  const activeSection = useActiveSection(contentIds);

  const handleSectionClick = (sectionId: string): void => {
    scrollToSection(sectionId, 100);
  };

  return (
    <>
      {/* Enhanced Header Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/5 via-white to-primary/5 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-4 mb-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="h2-bold-40 text-base-black">
                Terms & Conditions
              </h1>
              <p className="body-regular-16 text-grey-medium mt-2 max-w-2xl">
                Please read these terms carefully. By using Chatblix, you agree to be
                bound by these terms. Last updated: January 2024
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Breadcrumb items={SupportCrumb} />
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <StickyTOCLayout
        tocItems={tableOfContentsItems}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <TermsContent content={termsContentData} />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-grey-light/60 bg-gradient-to-br from-primary/5 to-primary/10 p-8"
        >
          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-1" />
            <div>
              <h3 className="body-bold-16 text-base-black mb-2">
                Questions about our Terms?
              </h3>
              <p className="body-regular-14 text-grey-medium mb-4">
                If you have any questions about these terms or need clarification on
                specific points, please don't hesitate to reach out to our support team.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-primary font-medium hover:underline transition-all"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </motion.div>
      </StickyTOCLayout>
    </>
  );
};

export default TermsCondition;
