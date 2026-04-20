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
import { Lock, Eye, CheckCircle2 } from "lucide-react";

const Policy: React.FC = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Privacy Policy" },
  ];

  const tocItems: TableOfContentsItem[] = termsContentData.map((item) => ({
    id: item.id,
    title: item.title,
    level: item.level,
  }));

  const contentIds = termsContentData.map((item) => item.id);
  const activeSection = useActiveSection(contentIds);

  const handleSectionClick = (id: string): void => {
    scrollToSection(id, 100);
  };

  const privacyHighlights = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Data Encryption",
      description: "All data encrypted in transit and at rest with industry standards",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Transparent Practices",
      description: "Clear communication about how we collect and use your data",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Your Control",
      description: "Full control over your personal data and privacy preferences",
    },
  ];

  return (
    <>
      {/* Enhanced Header Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-success/5 via-white to-success/5 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-4 mb-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success flex-shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="h2-bold-40 text-base-black">
                Privacy Policy
              </h1>
              <p className="body-regular-16 text-grey-medium mt-2 max-w-2xl">
                We take your privacy seriously. This policy explains how we collect, use,
                and protect your personal information. Last updated: January 2024
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

      {/* Privacy Highlights */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 py-12 bg-white"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privacyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-grey-light/60 bg-gradient-to-br from-white to-grey-light/10 p-6 hover:shadow-md transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success mb-4">
                  {highlight.icon}
                </div>
                <h3 className="body-bold-14 text-base-black mb-2">
                  {highlight.title}
                </h3>
                <p className="body-regular-13 text-grey-medium">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <StickyTOCLayout
        tocItems={tocItems}
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
          className="mt-16 rounded-2xl border border-grey-light/60 bg-gradient-to-br from-success/5 to-success/10 p-8"
        >
          <div className="flex gap-4">
            <Lock className="h-6 w-6 text-success flex-shrink-0 mt-1" />
            <div>
              <h3 className="body-bold-16 text-base-black mb-2">
                Privacy & Security Commitment
              </h3>
              <p className="body-regular-14 text-grey-medium mb-4">
                Your privacy is our top priority. We comply with GDPR, CCPA, and other
                data protection regulations. For any privacy concerns, reach out to our
                dedicated privacy team.
              </p>
              <a
                href="mailto:privacy@chatblix.com"
                className="inline-flex items-center text-primary font-medium hover:underline transition-all"
              >
                Email Privacy Team →
              </a>
            </div>
          </div>
        </motion.div>
      </StickyTOCLayout>
    </>
  );
};

export default Policy;
