import React from "react";
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

const Policy: React.FC = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Terms & Condition" },
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

  return (
    <StickyTOCLayout
      breadcrumb={<Breadcrumb items={SupportCrumb} />}
      title="Assistant Tech's Privacy & Policy"
      subtitle="Please read these privacy and policy carefully before using our services."
      tocItems={tocItems}
      activeSection={activeSection}
      onSectionClick={handleSectionClick}
    >
      <TermsContent content={termsContentData} />
    </StickyTOCLayout>
  );
};

export default Policy;
